import React from 'react';

export interface RoleListParams {
  page?: number;
  limit?: number;
  roleName?: string;
}
export interface addRoleParams {
  menuIdList: React.Key[];
  roleName: string;
  remark?: string;
}
export interface updateRoleParams {
  menuIdList: number[];
  roleName: string;
  remark?: string;
  roleId: number;
}
export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}