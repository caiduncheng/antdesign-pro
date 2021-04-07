import request from 'umi-request';
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
interface RoleListParams {
  page?: number;
  limit?: number;
  roleName?: string;
}
export interface addRoleParams {
  menuIdList: React.Key[];
  roleName: string;
  remark?: string;
}
export interface updateRoleParams extends addRoleParams {
  // menuIdList: number[];
  // roleName: string;
  // remark?: string;
  roleId: number;
}
export async function queryRoles(params?: RoleListParams) {
  return request('/api/sys/role/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryRoleById(roleId: number) {
  return request(`/api/sys/role/info/${roleId}`, {
    method: 'GET',
  });
}
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    method: 'GET',
  });
}
export async function addRole(params: addRoleParams) {
  return request('/api/sys/role/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateRole(params: updateRoleParams) {
  return request('/api/sys/role/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removeRole(params: { deleteIds: number[] }) {
  return request('/api/sys/role/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
