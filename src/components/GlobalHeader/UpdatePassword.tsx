import { updatePasswordParams } from '@/services/user';
import ProForm from '@ant-design/pro-form';
import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useIntl, FormattedMessage } from 'umi';

interface UpdatePasswordProps {
  modalVisible: boolean;
  title: string;
  userName: string;
  onCancel: () => void;
  onSubmit: (values: updatePasswordParams) => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = (props) => {
  const { title, modalVisible, userName, onCancel, onSubmit } = props;
  const intl = useIntl();
  const renderContent = () => {
    return (
      <ProForm
        onFinish={async (values: updatePasswordParams) => {
          const { newPassword, password } = values;
          onSubmit({ newPassword, password });
        }}
      >
        <Form.Item
          label={intl.formatMessage({
            id: 'pages.header.avatarDropdown.userName.label',
            defaultMessage: '账号',
          })}
        >
          <Input defaultValue={userName} disabled />
        </Form.Item>
        <Form.Item
          name="password"
          label={intl.formatMessage({
            id: 'pages.header.avatarDropdown.oldPassword.label',
            defaultMessage: '原密码',
          })}
          rules={[
            {
              required: true,
              // message: 'Please input your old password!',
              message: (
                <FormattedMessage
                  id="pages.header.avatarDropdown.oldPassword.required"
                  defaultMessage="请输入旧密码！"
                />
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={intl.formatMessage({
            id: 'pages.header.avatarDropdown.newPassword.label',
            defaultMessage: '新密码',
          })}
          rules={[
            {
              required: true,
              // message: 'Please input your password!',
              message: (
                <FormattedMessage
                  id="pages.header.avatarDropdown.newPassword.required"
                  defaultMessage="请输入新密码！"
                />
              ),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={intl.formatMessage({
            id: 'pages.header.avatarDropdown.comfirmPassword.label',
            defaultMessage: '确认密码',
          })}
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              // message: 'Please confirm your password!',
              message: (
                <FormattedMessage
                  id="pages.header.avatarDropdown.comfirmPassword.required"
                  defaultMessage="请输入确认密码！"
                />
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  // new Error('The two passwords that you entered do not match!'),
                  new Error(
                    intl.formatMessage({
                      id: 'pages.header.avatarDropdown.comfirmPassword.match',
                      defaultMessage: '两次输入密码不一致！',
                    }),
                  ),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </ProForm>
    );
  };
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {renderContent()}
    </Modal>
  );
};
export default UpdatePassword;
