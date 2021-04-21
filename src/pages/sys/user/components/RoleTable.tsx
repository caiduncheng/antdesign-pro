import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { Key, useRef, useState } from 'react';
import { RoleListItem, queryRoles } from '@/services/role';

interface RoleTableProps {
  getRoles: (roles: Key[]) => void;
  choosedRoles: Key[];
}
const RoleTable: React.FC<RoleTableProps> = (props: RoleTableProps) => {
  const { choosedRoles, getRoles } = props;

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      valueType: 'text',
    },
    {
      title: '角色ID',
      dataIndex: 'roleId',
      valueType: 'text',
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'creTime',
      valueType: 'dateTime',
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInForm: true,
    },
  ];

  const [selectedRowsState, setSelectedRows] = useState<Key[]>([]);
  const [defaultSelectedState, setDefaultSelected] = useState<Key[]>(choosedRoles);

  return (
    <div>
      <ProTable<RoleListItem>
        // headerTitle="用户表格"
        actionRef={actionRef}
        search={false}
        rowKey="roleId"
        options={{
          search: true,
        }}
        headerTitle="用户角色"
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={async (params) => {
          const msg = await queryRoles({ page: params.current, limit: params.pageSize });
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
          type: 'checkbox',
          selectedRowKeys: [...selectedRowsState, ...defaultSelectedState],
          onChange: (selectedRowKeys, selectedRows) => {
            setDefaultSelected([]);
            // console.log(`selectedRowKeys1: ${selectedRowKeys}`, 'selectedRows1: ', selectedRows);
            getRoles(selectedRowKeys);
            return setSelectedRows(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({
            disabled: false,
            // Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead
            // defaultChecked: defaultSelectedState.includes(record.roleId),
          }),
        }}
      />
    </div>
  );
};

export default RoleTable;
