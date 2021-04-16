import React from 'react';
import MenuSelector from './MenuSelector';
import { ProFormText } from '@ant-design/pro-form';

const MenuForm = () => (
  <>
    <ProFormText
      name="menu-name"
      label="菜单名称"
      rules={[{ required: true, message: '菜单名称不能为空' }]}
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
    <MenuSelector />
    <ProFormText
      name="menu-url"
      label="菜单路由"
      rules={[{ required: true, message: '菜单路由不能为空' }]}
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
    <ProFormText
      name="menu-perms"
      label="授权标识"
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
    <ProFormText
      name="menu-orderNum"
      label="排序序号"
      rules={[{ pattern: /^(0|[1-9][0-9]*)$/, message: '请输入正确的数字' }]}
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
  </>
);

export default MenuForm;
