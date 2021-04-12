import React from 'react';
import ProFrom, { ProFormRadio } from '@ant-design/pro-form';

interface UpdateFormProps {
  modalVisible: boolean;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="修改菜单"
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
