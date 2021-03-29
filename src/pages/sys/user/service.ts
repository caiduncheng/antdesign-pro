import request from 'umi-request';
import { TableDataParams, addListParams, updateListParams } from './data.d';
let token = localStorage.getItem('token');
let headers: any = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: token,
};
export async function queryRule(params?: TableDataParams) {
  return request('/api/sys/user/list', {
    method: 'POST',
    data: {
      ...params,
    },
    headers: headers,
  });
}

export async function removeRule(params: { userIds: number[] }) {
  return request('/api/sys/user/delete', {
    method: 'POST',
    data: {
      ...params,
    },
    headers: headers,
  });
}

export async function addRule(params: addListParams) {
  return request('/api/sys/user/save', {
    method: 'POST',
    data: {
      ...params,
    },
    headers: headers,
  });
}

export async function updateRule(params: updateListParams) {
  return request('/api/sys/user/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
    headers: headers,
  });
}
export async function resetPwRule(params: { userIds: number }) {
  return request('/api/sys/user/resetPw', {
    method: 'POST',
    data: {
      ...params,
    },
    headers: headers,
  });
}
