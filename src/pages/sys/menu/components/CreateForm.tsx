import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ modalVisible, onCancel, children }) => {
  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default CreateForm;
