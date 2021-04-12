import React from 'react';
import MenuSelector from './MenuSelector';
import { ProFormText } from '@ant-design/pro-form';

const MenuForm = () => (
  <>
    <ProFormText
      name="name"
      label="菜单名称"
      rules={[{ required: true, message: '目录名称不能为空' }]}
    />
    <MenuSelector />
    <ProFormText
      name="url"
      label="菜单路由"
      rules={[{ required: true, message: '目录名称不能为空' }]}
    />
    <ProFormText name="perms" label="授权标识" />
    <ProFormText name="orderNum" label="排序序号" />
  </>
);

export default MenuForm;
