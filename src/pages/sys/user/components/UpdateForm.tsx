import React, { Key, useState } from 'react';
import { Modal } from 'antd';
import { updateListParams, TableListItem } from '@/services/user';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import RoleTable from './RoleTable';

interface UpdateFormProps {
  onSubmit: (values: updateListParams) => void;
  updateModalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  values: TableListItem;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel, onSubmit, values } = props;
  const [roleListState, setRoleList] = useState<Key[]>(values.roleIdList);
  const [initialValuesState, setInitialValues] = useState<{}>({
    status: values.status,
    mobile: values.mobile,
    email: values.email,
    username: values.username,
  });
  console.log(values.roleIdList);

  const renderContent = () => {
    return (
      <ProForm<updateListParams>
        onFinish={async (value) => {
          value.userId = values.userId;
          value.roleIdList = roleListState;
          console.log(value);

          onSubmit(value);
        }}
        onReset={() => {
          setRoleList([]);
          setInitialValues({});
        }}
        initialValues={initialValuesState}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            // tooltip="最长为 24 位"
            placeholder="请输入用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          />
          <ProFormText
            width="md"
            name="mobile"
            label="手机号码"
            placeholder="请输入手机号码"
            rules={[
              {
                pattern: /^1\d{10}$/,
                message: '不合法的手机号格式!',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱地址"
            placeholder="请输入邮箱"
            rules={[
              {
                pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                message: '不合法的邮箱地址！',
              },
            ]}
          />
        </ProForm.Group>
        <ProFormRadio.Group
          name="status"
          label="用户状态"
          options={[
            {
              label: '禁用',
              value: 0,
            },
            {
              label: '正常',
              value: 1,
            },
          ]}
        />
        <RoleTable
          getRoles={(roles: Key[]) => setRoleList(roles)}
          choosedRoles={values.roleIdList}
        />
      </ProForm>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      // footer={renderFooter()}
      footer={null}
    >
      {/* {props.children} */}
      {renderContent()}
    </Modal>
  );
};

export default UpdateForm;
