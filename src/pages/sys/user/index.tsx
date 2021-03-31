import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import RoleTable from './components/RoleTable';
import UpdateForm from './components/UpdateForm';
import { TableListItem, addListParams, updateListParams } from './data.d';
import { RoleListParams } from '../role/data.d';
import { queryRule, updateRule, addRule, removeRule, resetPwRule } from './service';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: addListParams) => {
  const hide = message.loading('正在添加');
  console.log(fields);

  try {
    const res = await addRule({ ...fields });
    if (res.msg === 'SUCCESS') {
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
const handleUpdate = async (fields: updateListParams) => {
  const hide = message.loading('正在更新');
  console.log(fields);

  try {
    const res = await updateRule({ ...fields });
    if (res.msg === 'SUCCESS') {
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const res = await removeRule({
      userIds: selectedRows.map((row) => row.userId),
    });
    if (res.msg === 'SUCCESS') {
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
/**
 *  重置密码
 * @param selectedRows
 */
const handleSetPW = async (user: { userId: number }) => {
  const hide = message.loading('正在重置密码');
  try {
    const res = await resetPwRule(user);
    if (res.msg === 'SUCCESS') {
      hide();
      message.success('重置密码成功，即将刷新');
      return true;
    }
    message.error(res.msg);
    return false;
  } catch (error) {
    hide();
    message.error('重置密码失败，请重试');
    return false;
  }
};
const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [roleListState, setRoleList] = useState<number[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'userId',
      hideInForm: true,
      tip: '用户ID是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '登录名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'creTime',
      sorter: true,
      hideInForm: true,
      valueType: 'dateTime',
    },
    // {
    //   title: '职务等级',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   // renderText: (val: string) => `${val} 万`,
    // },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
    },

    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        // 1: { text: '正常', status: 'Processing' },
        1: { text: '正常', status: 'Success' },
        // 3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '预设值标识',
      dataIndex: 'preInstallSign',
      valueEnum: {
        0: { text: '非预设', status: 'Default' },
        1: { text: '预设', status: 'Success' },
      },
    },
    {
      title: '角色列表',
      dataIndex: 'roleIdList',
      hideInTable: true,
      hideInSearch: true,
      // initialValue: ['all'],
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              console.log(record);

              setStepFormValues(record);
            }}
          >
            修改
          </a>
          {/* <Divider type="vertical" />
          <a href="">订阅警报</a> */}
          <Divider type="vertical" />
          <Popconfirm
            title={`确定对【${record.username}】进行【删除】操作?`}
            onConfirm={async () => {
              const user = [];
              user.push(record);
              const success = await handleRemove(user);
              if (success) {
                actionRef.current?.reloadAndRest?.();
              }
            }}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>

          <Divider type="vertical" />

          <Popconfirm
            title={`确定对【${record.username}】进行【重置密码】操作?`}
            onConfirm={async () => {
              const success = await handleSetPW({ userId: record.userId });
              if (success) {
                actionRef.current?.reloadAndRest?.();
              }
            }}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <a href="">重置密码</a>
          </Popconfirm>
          {/* <Divider type="vertical" />
          <a href="">配置角色</a> */}
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="用户表格"
        actionRef={actionRef}
        rowKey="userId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={async (params) => {
          const msg = await queryRule({
            page: params.current,
            limit: params.pageSize,
            username: params.username,
          });
          // console.log(msg);

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
              <span>
                {/* 服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万 */}
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              const success = await handleRemove(selectedRowsState);
              if (success) {
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        {/* <ProTable<TableListItem, addListParams>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="userId"
          type="form"
          columns={columns}
          // form="layout:horizontal"
          // layout="horizontal"
        /> */}
        <ProForm<addListParams>
          onFinish={async (values) => {
            // await waitTime(2000);
            values.roleIdList = roleListState;
            console.log(values);
            const res = await handleAdd(values);
            if (res) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          initialValues={{
            status: 1,
          }}
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
              name="password"
              label="用户密码"
              placeholder="请输入密码"
              rules={[{ required: true, message: '请输入密码!' }]}
            />
            <ProFormText
              width="md"
              name="mobile"
              label="手机号码"
              placeholder="请输入手机号码"
              rules={[
                { required: true, message: '请输入手机号码!' },
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
                { required: true, message: '请输入邮箱!' },
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
          {/* <ProFormCheckbox.Group
            name="roleIdList"
            label="选择角色"
            // options={['A', 'B', 'C', 'D', 'E', 'F']}
            request={async (params:RoleListParams) => {}}
            placeholder="请选择角色"
          /> */}
          <RoleTable getRoles={(roles) => setRoleList(roles)} choosedRoles={[]} />
        </ProForm>
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        // <UpdateForm
        //   onSubmit={async (value) => {
        //     const success = await handleUpdate(value);
        //     if (success) {
        //       handleUpdateModalVisible(false);
        //       setStepFormValues({});
        //       if (actionRef.current) {
        //         actionRef.current.reload();
        //       }
        //     }
        //   }}
        //   onCancel={() => {
        //     handleUpdateModalVisible(false);
        //     setStepFormValues({});
        //   }}
        //   updateModalVisible={updateModalVisible}
        //   values={stepFormValues}
        // />
        <UpdateForm
          onSubmit={async (value: updateListParams) => {
            const success = await handleUpdate(value);
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
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        ></UpdateForm>
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.username && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.username}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.username,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
