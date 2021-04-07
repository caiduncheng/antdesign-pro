import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Menu } from '@/res';
import {
  Tag,
  Space,
  Button,
  Divider,
  TreeSelect,
  Form,
  Popover,
  Input,
  Popconfirm,
  message,
} from 'antd';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { ConnectState } from '@/models/connect';
import { connect } from 'umi';
import iconList from '@/assets/icons';
import {
  saveMenu,
  saveMenuParamsType,
  delMenu,
  queryMenuList,
  queryMenuSelect,
} from '@/services/menu';
import { treeDataTranslate } from '@/utils/utils';
import type { Dispatch } from 'umi';
interface TreeSelectType {
  title?: string;
  value?: number;
  children?: TreeSelectType[];
}

interface MenuTableProps {
  menuSelect: Menu[];
  dispatch: Dispatch;
}

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2430927_xlefq8levvh.js', // 在 iconfont.cn 上生成
});

const normalizeMenu = (menuList: Menu[]) => {
  const res: TableListItem[] = [];
  let c: TableListItem[] | undefined;

  for (let i = 0; i < menuList.length; i++) {
    const { name, url, icon, orderNum, parentName, menuId, type } = menuList[i];
    const obj: TableListItem = {
      name,
      url,
      icon,
      orderNum,
      parentName,
      menuId,
      label:
        type === 0
          ? { name: '目录', color: 'blue' }
          : type === 1
          ? { name: '菜单', color: 'green' }
          : { name: '按钮', color: 'gray' },
    };
    if (menuList[i].children && menuList[i].children.length > 0) {
      c = normalizeMenu(menuList[i].children);
      res.push({ ...obj, children: c });
    } else {
      res.push({ ...obj });
    }
  }
  return res;
};

const menuToTreeData = (menuData: Menu[]): TreeSelectType[] => {
  const res: TreeSelectType[] = [];
  let c: TreeSelectType[];
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].children && menuData[i].children.length > 0) {
      c = menuToTreeData(menuData[i].children);
      res.push({
        title: menuData[i].name,
        value: menuData[i].menuId,
        children: c,
      });
    } else {
      res.push({
        title: menuData[i].name,
        value: menuData[i].menuId,
      });
    }
  }

  return res;
};

/**
 * 添加菜单
 */
const handleAdd = async (fields: saveMenuParamsType) => {
  const hide = message.loading('正在添加');
  try {
    await saveMenu({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const MenuTable: React.FC<MenuTableProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [iconInputValue, setIconInputValue] = useState('');
  const [type, setType] = useState(0);
  const [treeDataValue, setTreeDataValue] = useState(0);
  const ref = useRef<ActionType>();

  const { menuSelect, dispatch } = props;
  let foramattedMenuSelect: any = null;

  useEffect(() => {
    dispatch({
      type: 'menu/getMenuSelect',
    });
  }, []);

  foramattedMenuSelect = menuToTreeData(treeDataTranslate(menuSelect, 'menuId'));

  const queryMenu = async () => {
    const res = await queryMenuList();
    const treeMenu = treeDataTranslate(res.data.menuList, 'menuId');
    const normalizedMenu = normalizeMenu(treeMenu);
    return {
      sucess: true,
      data: normalizedMenu,
      total: normalizedMenu.length,
    };
  };

  const onTreeSelectChange = (value: number) => {
    setTreeDataValue(value);
  };

  const ParentMenuSelector = () => (
    <Form.Item label="上级菜单">
      <TreeSelect
        style={{ width: '100%' }}
        value={treeDataValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        treeData={foramattedMenuSelect}
        treeDefaultExpandAll
        onChange={onTreeSelectChange}
      />
    </Form.Item>
  );

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单名称不能为空',
          },
        ],
      },
    },
    {
      title: '上级菜单',
      dataIndex: 'parent',
      align: 'center',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '上级菜单不能为空',
          },
        ],
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      render: (_, record) => <Icon type={'icon-' + record.icon} />,
      align: 'center',
    },
    {
      title: '菜单类型',
      dataIndex: 'label',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tag color={record.label.color}>{record.label.name}</Tag>
        </Space>
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单类型不能为空',
          },
        ],
      },
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
      align: 'center',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '排序号不能为空',
          },
        ],
      },
    },
    {
      title: '菜单URL',
      dataIndex: 'url',
      align: 'center',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单URL不能为空',
          },
        ],
      },
    },
    {
      title: '授权标识',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setModalVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title={`确定对【${record.name}】进行【删除】操作?`}
            onConfirm={async () => {
              const res = await delMenu(record.menuId);
              if (res.code === '0000') {
                message.success('删除成功');
                ref.current?.reload();
              }
            }}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const DirectoryForm = () => (
    <>
      <ProFormText
        name="name"
        label="目录名称"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ParentMenuSelector />
      <ProFormText name="orderNum" label="排序号" />
      <Popover
        content={() =>
          iconList.map((icon) => (
            <Button
              key={icon}
              style={{ marginLeft: '5px' }}
              icon={<Icon type={icon} />}
              size="large"
              onClick={() => {
                setIconInputValue(icon.split('-')[1]);
                setPopOverVisible(false);
              }}
            />
          ))
        }
        title="Title"
        trigger="click"
        visible={popOverVisible}
        onVisibleChange={(visible) => setPopOverVisible(visible)}
        placement="bottomRight"
        arrowPointAtCenter={true}
      >
        <Form.Item label="图标">
          <Input value={iconInputValue} />
        </Form.Item>
      </Popover>
    </>
  );

  const MenuForm = () => (
    <>
      <ProFormText
        name="name"
        label="菜单名称"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ParentMenuSelector />
      <ProFormText
        name="url"
        label="菜单路由"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ProFormText name="perms" label="授权标识" />
      <ProFormText name="orderNum" label="排序序号" />
    </>
  );

  const ButtonForm = () => (
    <>
      <ProFormText
        name="name"
        label="按钮名称"
        rules={[{ required: true, message: '按钮名称不能为空' }]}
      />
      <ParentMenuSelector />
      <ProFormText name="perms" label="授权标识" />
    </>
  );

  const Components = {
    '0': DirectoryForm,
    '1': MenuForm,
    '2': ButtonForm,
  };
  const FormComponents = Components[type];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        actionRef={ref}
        columns={columns}
        search={false}
        headerTitle="新增菜单"
        rowKey="menuId"
        request={queryMenu}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined /> 新增菜单
          </Button>,
        ]}
      ></ProTable>
      <CreateForm modalVisible={modalVisible} onCancel={() => setModalVisible(false)}>
        <ProForm
          onFinish={async (formData: saveMenuParamsType) => {
            const success = await handleAdd({
              ...formData,
              parentId: treeDataValue,
              icon: iconInputValue,
              type,
            });
            if (success) {
              setModalVisible(false);
              ref.current?.reload();
              window.location.reload();
            }
          }}
        >
          <ProFormRadio.Group
            style={{
              margin: 16,
            }}
            radioType="button"
            fieldProps={{
              value: type,
              onChange: (e) => setType(e.target.value),
            }}
            options={[
              { label: '目录', value: 0 },
              { label: '菜单', value: 1 },
              { label: '按钮', value: 2 },
            ]}
          />
          <FormComponents />
        </ProForm>
      </CreateForm>
    </PageContainer>
  );
};

export default connect(({ menu }: ConnectState) => ({
  menuData: menu.menuData,
  menuSelect: menu.menuSelect,
}))(MenuTable);
