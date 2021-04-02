import React, { useRef, useState } from 'react';
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
import { MenuStateType } from '@/models/menu';
import iconList from '@/assets/icons';
import { saveMenu, saveMenuParamsType, queryMenuNav, delMenu } from '@/services/menu';

interface TreeData {
  title?: string;
  value?: number;
  children?: TreeData[];
}

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2430927_xlefq8levvh.js', // 在 iconfont.cn 上生成
});

const normalizeMenu = (menuList: Menu[]) => {
  const res: TableListItem[] = [];
  let c: TableListItem[] | undefined;

  for (let i = 0; i < menuList.length; i++) {
    const { name, url, icon, orderNum, parentName, menuId } = menuList[i];
    const obj: TableListItem = {
      name,
      url,
      icon,
      orderNum,
      parentName,
      menuId,
      label:
        menuList[i].list.length > 0
          ? { color: 'green', name: '菜单' }
          : { color: 'blue', name: '目录' },
    };
    if (menuList[i].list.length > 0) {
      c = normalizeMenu(menuList[i].list);
      res.push({ ...obj, children: c });
    } else {
      res.push({ ...obj });
    }
  }
  return res;
};

const menuToTreeData = (menuData: Menu[]): TreeData[] => {
  const res: TreeData[] = [];
  let c: TreeData[];
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].list.length > 0) {
      c = menuToTreeData(menuData[i].list);
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

const MenuTable: React.FC<MenuStateType> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [iconInputValue, setIconInputValue] = useState('');
  const [type, setType] = useState(0);
  const [treeDataValue, setTreeDataValue] = useState(0);
  const ref = useRef<ActionType>();

  const queryMenu = async () => {
    // const res = await request<ResponseResult<Menu>>('/api/menulist');
    const res = await queryMenuNav();
    const normalizedMenu = normalizeMenu(res.data.menuList);
    return {
      sucess: true,
      data: normalizeMenu(res.data.menuList),
      total: normalizedMenu.length,
    };
  };

  const onTreeSelectChange = (value) => {
    setTreeDataValue(value);
  };

  const ParentMenuSelctor = () => (
    <Form.Item label="上级菜单">
      <TreeSelect
        style={{ width: '100%' }}
        value={treeDataValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        treeData={[{ title: '一级菜单', children: menuToTreeData(props.menuData), value: 0 }]}
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

  const DirectoryForm: React.FC = () => (
    <>
      <ProFormText
        name="name"
        label="目录名称"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ParentMenuSelctor />
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
                setIconInputValue(icon);
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

  const MenuForm: React.FC = () => (
    <>
      <ProFormText
        name="name"
        label="菜单名称"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ParentMenuSelctor />
      <ProFormText
        name="url"
        label="菜单路由"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ProFormText
        name="perms"
        label="授权标识"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
      <ProFormText
        name="orderNum"
        label="排序序号"
        rules={[{ required: true, message: '目录名称不能为空' }]}
      />
    </>
  );

  const ButtonForm: React.FC = () => (
    <>
      <ProFormText name="name" label="按钮名称" />
      <ProFormText name="parentId" label="上级菜单" />
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
        rowKey="name"
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
            saveMenu({
              ...formData,
              parentId: treeDataValue,
              icon: iconInputValue,
              type,
            });
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
              { label: '目录', value: '0' },
              { label: '菜单', value: '1' },
              { label: '按钮', value: '2' },
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
}))(MenuTable);
