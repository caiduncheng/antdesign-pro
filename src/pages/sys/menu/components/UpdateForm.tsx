import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
import { updateMenuParamsType } from '@/services/menu';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { MenuStateType } from '@/models/menu';
import { updatedMenu } from '@/services/menu';
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

const handleUpdate = async (fields: updateMenuParamsType) => {
  let newFields: updateMenuParamsType = { menuId: 0, name: '', type: 0, parentId: 0 };
  if (fields.type === 0) {
    newFields = {
      menuId: fields.menuId,
      type: fields.type,
      name: fields['directory-name'].replace(/(^\s*)|(\s*$)/g, ''),
      parentId: fields.parentId,
      orderNum: fields['directory-orderNum'],
      icon: fields.icon,
    };
  } else if (fields.type === 1) {
    newFields = {
      menuId: fields.menuId,
      type: fields.type,
      name: fields['menu-name'].replace(/(^\s*)|(\s*$)/g, ''),
      parentId: fields.parentId,
      url: fields['menu-url'].replace(/(^\s*)|(\s*$)/g, ''),
      perms: fields['menu-perms'].replace(/(^\s*)|(\s*$)/g, ''),
      orderNum: fields['menu-orderNum'],
    };
  } else if (fields.type === 2) {
    newFields = {
      menuId: fields.menuId,
      type: fields.type,
      name: fields['button-name'].replace(/(^\s*)|(\s*$)/g, ''),
      parentId: fields.parentId,
      perms: fields['button-perms'].replace(/(^\s*)|(\s*$)/g, ''),
    };
  }
  // console.log(newFields);
  const hide = message.loading('正在更新');
  try {
    const res = await updatedMenu({ ...newFields });
    hide();
    if (res.code === '0000') {
      message.success('更新成功');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel, onFinish, dispatch, data, values } = props;
  const typeParam = values.type || 0;
  const [typeValue, setType] = useState<number>(typeParam);

  useEffect(() => {
    // if (typeParam === 0) {
    dispatch({
      type: 'menu/saveMenuForm',
      payload: {
        iconValue: values.icon || ''.split('-')[1],
        treeDataValue: values.parentId,
      },
    });
    setType(typeParam);
    // }
  }, [values.type || values.icon]);

  const Components = {
    '0': DirectoryForm,
    '1': MenuForm,
    '2': ButtonForm,
  };
  const FormComponents = Components[typeValue];

  if (!data) {
    return null;
  }
  const initialValuesParam = () => {
    let initValue = {};
    if (typeValue === 0) {
      initValue = {
        'directory-name': values.name,
        'directory-orderNum': values.orderNum,
        type: typeValue,
      };
    } else if (typeValue === 1) {
      initValue = {
        'menu-name': values.name,
        'menu-url': values.url,
        'menu-perms': values.perms,
        'menu-orderNum': values.orderNum,
        type: typeValue,
      };
    } else if (typeValue === 2) {
      initValue = {
        'button-name': values.name,
        'button-perms': values.perms,
        type: typeValue,
      };
    }
    return initValue;
  };

  return (
    <Modal
      destroyOnClose
      title="更新菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        onFinish={async (formData: updateMenuParamsType) => {
          console.log(formData);
          const success = await handleUpdate({
            ...formData,
            parentId: data.treeDataValue,
            icon: data.iconValue,
            type: typeValue,
            menuId: values.menuId,
          });
          if (success) {
            onFinish();
          }
        }}
        initialValues={initialValuesParam()}
      >
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: typeValue,
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
}))(UpdateForm);
