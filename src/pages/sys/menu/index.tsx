import React, { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import request from 'umi-request';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormRadio } from '@ant-design/pro-form';
import { Menu, ResponseResult } from '@/res';
import { Tag, Space, Button, Form } from 'antd';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import CreateForm from './components/CreateForm';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2430927_xlefq8levvh.js', // 在 iconfont.cn 上生成
});

interface TableListItem {
  name: string;
  icon?: string;
  parent?: string;
  children?: TableListItem[];
  url?: string;
  authorizeSign?: string;
  parentName?: string;
  orderNum: number;
  label: { name: string; color: string };
}

const normalizeMenu = (menuList: Menu[]) => {
  const res: TableListItem[] = [];
  let c: TableListItem[] | undefined;

  for (let i = 0; i < menuList.length; i++) {
    const { name, url, icon, orderNum, parentName } = menuList[i];
    const obj: TableListItem = {
      name,
      url,
      icon,
      orderNum,
      parentName,
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

const MenuList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('LightFilter');

  const queryMenu = async () => {
    const res = await request<ResponseResult<Menu>>('/api/menulist');
    const normalizedMenu = normalizeMenu(res.data.menuList);
    return {
      sucess: true,
      data: normalizeMenu(res.data.menuList),
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
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
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
        <ProForm>
          <ProFormRadio.Group
            style={{
              margin: 16,
            }}
            radioType="button"
            fieldProps={{
              value: type,
              onChange: (e) => setType(e.target.value),
            }}
            options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter']}
          />
        </ProForm>
      </CreateForm>
    </PageContainer>
  );
};

export default MenuList;
