import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Menu } from '@/res';
import { Tag, Space, Button, Divider, Popconfirm, message } from 'antd';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { ConnectState } from '@/models/connect';
import { connect } from 'umi';
import { delMenu, queryMenuList, queryMenuInfo } from '@/services/menu';
import { isAuth, treeDataTranslate } from '@/utils/utils';
import type { Dispatch } from 'umi';
import styles from '@/global.less';
// import UpdateForm from './components/UpdateForm';

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

const queryMenuByMenuId = async (menuId: number) => {
  const hide = message.loading('正在查询');
  try {
    const res = await queryMenuInfo(menuId);
    hide();
    if (res.code === '0000') {
      return res.data;
    }
    message.error(res.msg);
    return false;
  } catch {
    hide();
    message.error('查询失败！');
    return false;
  }
};

const MenuTable: React.FC<MenuTableProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState<Menu>();

  const ref = useRef<ActionType>();

  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'menu/getMenuSelect',
    });
  }, []);

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
            onClick={async () => {
              const menuInfo = await queryMenuByMenuId(record.menuId);
              if (menuInfo) {
                setUpdateFormValues(menuInfo);
                setUpdateModalVisible(true);
                console.log(menuInfo);
              }
            }}
            hidden={!isAuth('sys:menu:update')}
          >
            修改
          </a>
          <Divider type="vertical" className={!isAuth('sys:user:update') && styles.hidden} />
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
            <a href="#" hidden={!isAuth('sys:menu:delete')}>
              删除
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

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
          <Button
            type="primary"
            key="primary"
            onClick={() => setModalVisible(true)}
            hidden={!isAuth('sys:menu:save')}
          >
            <PlusOutlined /> 新增菜单
          </Button>,
        ]}
      ></ProTable>
      <CreateForm
        modalVisible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onFinish={() => {
          setModalVisible(false);
          ref.current?.reload();
          window.location.reload();
        }}
      />
      {updateFormValues && (
        <UpdateForm
          modalVisible={updateModalVisible}
          values={updateFormValues}
          updateModalVisible={updateModalVisible}
          onCancel={() => setUpdateModalVisible(false)}
          onFinish={() => {
            setUpdateModalVisible(false);
            ref.current?.reload();
            window.location.reload();
          }}
        />
      )}
    </PageContainer>
  );
};

export default connect(({ menu }: ConnectState) => ({
  menuData: menu.menuData,
  menuSelect: menu.menuSelect,
}))(MenuTable);
