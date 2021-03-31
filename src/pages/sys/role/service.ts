import { Menu } from '@/res';
import request from 'umi-request';
import { TableListParams, RoleListParams } from './data.d';
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
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    headers,
    method: 'GET',
  });
}
export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
