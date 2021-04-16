import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import MenuSelector from './MenuSelector';

const ButtonForm = () => (
  <>
    <ProFormText
      name="button-name"
      label="按钮名称"
      rules={[{ required: true, message: '按钮名称不能为空' }]}
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
    <MenuSelector />
    <ProFormText
      name="button-perms"
      label="授权标识"
      // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
    />
  </>
);

export default ButtonForm;
