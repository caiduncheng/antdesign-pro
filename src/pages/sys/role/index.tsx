import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import { addRoleParams, updateRoleParams } from './data.d';
// import { RoleList } from 'res.d';
import { queryRoles, addRole, updateRole, queryRoleById, removeRole } from './service';
import { Role } from '@/res';
const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: addRoleParams) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addRole({ ...fields });
    if (res.code === '0000') {
      hide();
      message.success('添加成功');
      return true;
    }
    message.error(res.msg);
    return false;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: updateRoleParams) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateRole({ ...fields });
    if (res.code === '0000') {
      hide();
      message.success('更新成功');
      return true;
    }
    message.error(res.msg);
    return false;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 通过id查询角色信息
 * @param fields
 */
const handleRoleById = async (roleId: number) => {
  const hide = message.loading('正在查询该用户信息');
  try {
    const res = await queryRoleById(roleId);
    if (res.code === '0000') {
      hide();
      return res.data;
    }
    message.error('查询失败');
    return null;
  } catch (error) {
    hide();
    message.error('查询失败请重试！');
    return null;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: Role[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const res = await removeRole({
      deleteIds: selectedRows.map((row) => row.roleId),
    });
    if (res.code === '0000') {
      hide();
      message.success('删除成功，即将刷新');
      return true;
    }
    message.error(res.msg);
    return false;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<Role>();
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<Role>();
  const [selectedRowsState, setSelectedRows] = useState<Role[]>([]);
  const columns: ProColumns<Role>[] = [
    {
      title: 'ID',
      dataIndex: 'roleId',
      hideInForm: true,
      tip: '角色ID是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色ID为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      valueType: 'text',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'creTime',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updTime',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '菜单列表',
      dataIndex: 'menuIdList',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              handleUpdateModalVisible(true);
              // console.log(record);
              const roleById = await handleRoleById(record.roleId);
              if (roleById) {
                setStepFormValues(roleById);
              }
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];
  function showDeleteConfirm() {
    let roleNames = selectedRowsState.reduce((pre: string[], cur: Role) => {
      pre.push(cur.roleName);
      return pre;
    }, []);
    confirm({
      title: `确定对【${roleNames.join('，')}】进行【批量删除】操作吗?`,
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        // console.log('OK');
        const success = await handleRemove(selectedRowsState);
        if (success) {
          setSelectedRows([]);
          actionRef.current?.reloadAndRest?.();
        }
      },
      onCancel() {
        // console.log('Cancel');
        setSelectedRows([]);
        actionRef.current?.reloadAndRest?.();
      },
    });
  }
  return (
    <PageContainer>
      <ProTable<Role>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="roleId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRoles({ ...params, sorter, filter })}
        request={async (params) => {
          const msg = await queryRoles({
            limit: params.pageSize,
            page: params.current,
            roleName: params.roleName,
          });

          return {
            data: msg.data.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.data.count,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              showDeleteConfirm();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        title={'新建角色'}
        onSubmit={async (params: addRoleParams) => {
          const success = await handleAdd(params);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        values={undefined}
      ></CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <CreateForm
          title={'修改角色'}
          onSubmit={async (params: updateRoleParams) => {
            const success = await handleUpdate(params);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues(undefined);
          }}
          modalVisible={updateModalVisible}
          values={stepFormValues}
        ></CreateForm>
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.roleId && (
          <ProDescriptions<Role>
            column={2}
            title={row?.roleName}
            request={async () => {
              // const roleById = await handleRoleById(row.roleId);
              return {
                data: row || {},
              };
            }}
            params={{
              id: row?.roleId,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
