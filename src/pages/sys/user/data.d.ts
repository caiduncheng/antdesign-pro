// export interface TableListItem {
//   key: number;
//   disabled?: boolean;
//   href: string;
//   avatar: string;
//   name: string;
//   owner: string;
//   desc: string;
//   callNo: number;
//   status: string;
//   updatedAt: Date;
//   createdAt: Date;
//   progress: number;
// }
export interface TableListItem {
  userId: number;
  username: string;
  email: string;
  mobile: string;
  status: number;
  preInstallSign: number;
  creTime: string;
  roleIdList: number[];
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
  username?: string;
  email?: string;
  mobile?: string;
  userId?: number;
  limit?: number;
  page?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
export interface TableDataParams {
  username?: string;
  limit?: number;
  page?: number;
}
export interface addListParams {
  email: string;
  mobile: string;
  password: string;
  roleIdList: RoleIDs[];
  status?: number;
  username: string;
}
export interface updateListParams {
  email?: string;
  mobile?: string;
  roleIdList: number[];
  status: number;
  userId: number;
}
export interface RoleListItem {
  creTime: string;
  creUserId: number;
  menuIdList?: number[];
  preInstallSign: number;
  remark?: string;
  roleId?: number;
  roleName?: string;
  updTime?: string;
  updUserId?: number;
}
export interface RoleIDs {
  roleId?: number;
}
