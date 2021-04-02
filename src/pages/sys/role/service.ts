import request from 'umi-request';
import { RoleListParams, addRoleParams, updateRoleParams } from './data.d';
let token = localStorage.getItem('token');
let headers: any = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: token,
};
export async function queryRoles(params?: RoleListParams) {
  return request('/api/sys/role/list', {
    method: 'POST',
    data: {
      ...params,
    },
    headers,
  });
}
export async function queryRoleById(roleId: number) {
  return request(`/api/sys/role/info/${roleId}`, {
    method: 'GET',
    headers,
  });
}
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    headers,
    method: 'GET',
  });
}
export async function addRole(params: addRoleParams) {
  return request('/api/sys/role/save', {
    method: 'POST',
    headers,
    data: {
      ...params,
    },
  });
}
export async function updateRole(params: updateRoleParams) {
  return request('/api/sys/role/update', {
    method: 'POST',
    headers,
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
    headers,
  });
}
