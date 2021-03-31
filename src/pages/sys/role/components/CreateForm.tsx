import React, { useEffect, useState } from 'react';
import { Dispatch } from 'umi';
import { Modal, Spin, Tree } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { addRoleParams } from '../data';
import { connect } from '@/.umi/plugin-dva/exports';
import { ConnectState } from '../models/connect';
import { TreeNode } from '../models/role';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  dispatch: Dispatch;
  treeData: TreeNode[];
}
const tree = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const CreateForm: React.FC<CreateFormProps> = (props) => {
  console.log(props);

  const { modalVisible, onCancel, dispatch, treeData } = props;
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([1]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // const treeDataRef = useRef<TreeNode[]>([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'role/getMenu',
      });
    }
  }, []);

  // const onLoadData = async () => {
  //   try {
  //     const res = await queryMenuList();
  //     if (res.msg === 'SUCCESS') {
  //       const tree = menuTree(res.data.menuList);
  //       const treeData = menuFormatter(tree);
  //       console.log(treeData);

  //       setTreeData(treeData);
  //     } else {
  //       message.error(res.msg);
  //     }
  //   } catch (error) {
  //     message.error('菜单列表请求失败，请重试');
  //   }
  // };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const renderContent = () => {
    return (
      <ProForm<addRoleParams>
        onFinish={async (value) => {
          console.log(value);

          // onSubmit(value);
        }}
        // initialValues={{
        //   status: values.status,
        //   mobile: values.mobile,
        //   email: values.email,
        //   username: values.username,
        // }}
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
          <Tree
            checkable
            // titleRender={() => tree}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            // onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        ) : (
          <div>
            <Spin />
          </div>
          // 'loading tree'
        )}
      </ProForm>
    );
  };
  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {renderContent()}
    </Modal>
  );
};

export default connect(({ tree }: ConnectState) => ({
  treeData: tree.treeData || [],
}))(CreateForm);
