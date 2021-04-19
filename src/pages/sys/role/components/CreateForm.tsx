import React, { useEffect, useState } from 'react';
import { Dispatch } from 'umi';
import { Modal, Spin, Tree } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { connect } from '@/.umi/plugin-dva/exports';
import { ConnectState } from '../models/connect';
import { TreeNode } from '../models/role';
import { Role } from '@/res';

interface CreateFormProps {
  modalVisible: boolean;
  title: string;
  onSubmit: (values: Role) => void;
  onCancel: () => void;
  dispatch: Dispatch;
  treeData: TreeNode[];
  allKey: number[];
  values: Role;
}
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, title, onCancel, onSubmit, dispatch, treeData, allKey, values } = props;
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(allKey);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(values?.menuIdList);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // const treeDataRef = useRef<TreeNode[]>([]);
  // console.log(treeDataRef);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'role/getMenu',
      });
    }
  }, []);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(true);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    // console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    // console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const renderContent = () => {
    return (
      <ProForm<Role>
        onFinish={async (value: Role) => {
          value.menuIdList = checkedKeys || [];
          // console.log(value);
          if (values) {
            value.roleId = values.roleId;
          }
          onSubmit(value);
        }}
        onReset={() => {
          setCheckedKeys(values?.menuIdList);
        }}
        initialValues={{
          roleName: values?.roleName,
          roleId: values?.roleId,
          remark: values?.remark,
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="roleName"
            label="角色名"
            // tooltip="最长为 24 位"
            placeholder="请输入角色名"
            rules={[{ required: true, message: '请输入角色名!' }]}
          />
          <ProFormTextArea width="md" name="remark" label="备注" placeholder="请输入备注" />
        </ProForm.Group>
        {treeData.length ? (
          <>
            <div>
              授权
              {/* <span style={{ color: '#ff4d4f', marginLeft: '10px' }} hidden={!!checkedKeys?.length}>
                请选择权限！
              </span> */}
            </div>
            <Tree
              checkable
              // titleRender={() => tree}
              style={{ margin: '10px 0' }}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
          </>
        ) : (
          <div>
            <Spin style={{ margin: '10px 0' }} />
          </div>
          // 'loading tree'
        )}
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

export default connect(({ role }: ConnectState) => ({
  treeData: role.treeData || [],
  allKey: role.allKey || [],
}))(CreateForm);
