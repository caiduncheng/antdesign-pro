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
import { TableListItem } from '../data';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  data?: MenuStateType['menuForm'];
  onFinish: () => void;
  dispatch: Dispatch;
  values: TableListItem;
}

const handleUpdate = async (fields: saveMenuParamsType) => {
  const hide = message.loading('正在更新');
  try {
    await saveMenu({ ...fields });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel, onFinish, data, values } = props;
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
      title="更新菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        onFinish={async (formData: saveMenuParamsType) => {
          const success = await handleUpdate({
            ...formData,
            parentId: data.treeDataValue,
            icon: data.iconValue,
            type: data.type,
          });
          if (success) {
            onFinish();
          }
        }}
        initialValues={{
          type: values.type,
          name: values.name,
          icon: values.icon,
        }}
      >
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: type,
            onChange: (e) => {
              console.log(e.target.value);

              setType(e.target.value);
            },
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
}))(UpdateForm);
