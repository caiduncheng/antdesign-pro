import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import MenuSelector from './MenuSelector';

const ButtonForm = () => (
  <>
    <ProFormText
      name="name"
      label="按钮名称"
      rules={[{ required: true, message: '按钮名称不能为空' }]}
    />
    <MenuSelector />
    <ProFormText name="perms" label="授权标识" />
  </>
);

export default ButtonForm;
