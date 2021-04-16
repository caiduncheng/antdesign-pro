import React, { useState } from 'react';
import { Modal, message } from 'antd';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
import { saveMenuParamsType } from '@/services/menu';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { MenuStateType } from '@/models/menu';
import { saveMenu } from '@/services/menu';
import DirectoryForm from './DirectoryForm';
import MenuForm from './MenuForm';
import ButtonForm from './ButtonForm';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  data?: MenuStateType['menuForm'];
  onFinish: () => void;
  dispatch: Dispatch;
}

const handleAdd = async (fields: saveMenuParamsType) => {
  let newFields: saveMenuParamsType = { name: '', type: 0, parentId: 0 };
  if (fields.type === 0) {
    newFields = {
      type: fields.type,
      name: fields['directory-name'],
      parentId: fields.parentId,
      orderNum: fields['directory-orderNum'],
      icon: fields.icon,
    };
  } else if (fields.type === 1) {
    newFields = {
      type: fields.type,
      name: fields['menu-name'],
      parentId: fields.parentId,
      url: fields['menu-url'],
      perms: fields['menu-perms'],
      orderNum: fields['menu-orderNum'],
    };
  } else if (fields.type === 2) {
    newFields = {
      type: fields.type,
      name: fields['button-name'],
      parentId: fields.parentId,
      perms: fields['button-perms'],
    };
  }
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

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onFinish, data } = props;
  const [type, setType] = useState(0);

  const Components = {
    '0': DirectoryForm,
    '1': MenuForm,
    '2': ButtonForm,
  };
  const FormComponents = Components[type];

  if (!data) {
    return null;
  }

  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        onFinish={async (formData: saveMenuParamsType) => {
          const success = await handleAdd({
            ...formData,
            parentId: data.treeDataValue,
            icon: data.iconValue,
            type,
          });
          if (success) {
            onFinish();
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
    </Modal>
  );
};

export default connect(({ menu }: ConnectState) => ({
  data: menu.menuForm,
}))(CreateForm);
