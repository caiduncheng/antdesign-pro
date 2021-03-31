import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { RoleListItem } from '../data.d';
import { queryRoles } from '../../role/service';

interface RoleTableProps {
  getRoles: (roles: number[]) => void;
  choosedRoles: number[];
}
const RoleTable: React.FC<RoleTableProps> = (props) => {
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

  if (props.choosedRoles?.length > 0) {
    props.getRoles(props.choosedRoles);
  }
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);

  return (
    <div>
      <ProTable<RoleListItem>
        // headerTitle="用户表格"
        actionRef={actionRef}
        search={false}
        rowKey="roleName"
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
          onChange: (_, selectedRows) => {
            let choosed =
              selectedRows.map((item: any) => {
                return item.roleId;
              }) || [];
            console.log(choosed);

            props.getRoles(choosed);
            return setSelectedRows(choosed);
            // console.log(selectedRowsState);
          },
        }}
      />
      {/* {console.log(selectedRowsState)} */}
      {/* {selectedRowsState?.length > 0 && } */}
    </div>
  );
};

export default RoleTable;
