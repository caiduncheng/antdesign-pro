import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { TableListItem, updateListParams } from '../data.d';
import RoleTable from './RoleTable';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: updateListParams) => void;
  onSubmit: (values: updateListParams) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

// export interface UpdateFormState {
//   formVals: FormValueType;
//   currentStep: number;
// }
const [roleListState, setRoleList] = useState<number[]>([]);
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState({
    email: props.values.email,
    mobile: props.values.mobile,
    roleIdList: props.values.roleIdList,
    status: props.values.status,
    userId: props.values.userId,
  });

  // const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // const forward = () => setCurrentStep(currentStep + 1);

  // const backward = () => setCurrentStep(currentStep - 1);

  // const handleNext = async () => {
  //   const fieldsValue = await form.validateFields();

  //   setFormVals({ ...formVals, ...fieldsValue });

  //   if (currentStep < 2) {
  //     forward();
  //   } else {
  //     handleUpdate({ ...formVals, ...fieldsValue });
  //   }
  // };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="mobile"
          label="手机号码"
          rules={[
            // { required: true, message: '请输入手机号码!' },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号格式!',
            },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱地址"
          rules={[
            // { required: true, message: '请输入邮箱!' },
            {
              pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
              message: '不合法的邮箱地址！',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem name="status" label="用户状态">
          <Radio.Group>
            <Radio value="0">禁用</Radio>
            <Radio value="1">正常</Radio>
          </Radio.Group>
        </FormItem>
        <RoleTable getRoles={(roles) => setRoleList(roles)} />
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false)}>取消</Button>
        <Button
          type="primary"
          // onClick={() => handleNext()}
        >
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改用户信息"
      visible={updateModalVisible}
      // footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userId: formVals.userId,
          status: formVals.status,
          roleIdList: formVals.roleIdList,
          mobile: formVals.mobile,
          eamil: formVals.email,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
