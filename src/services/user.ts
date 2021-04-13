import request from '@/utils/request';
import { getRsaPublicKey } from '@/utils/utils';
import JSEncrypt from 'jsencrypt';
import { Key } from 'react';
const rsa = new JSEncrypt({});
const publickey = getRsaPublicKey();
rsa.setPublicKey(publickey);
export interface updatePasswordParams {
  newPassword: string;
  password: string;
}
export interface TableListItem {
  userId: number;
  username: string;
  email: string;
  mobile: string;
  status: number;
  preInstallSign: number;
  creTime: string;
  roleIdList: Key[];
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
  roleIdList: Key[];
  status?: number;
  username: string;
}
export interface updateListParams {
  email?: string;
  mobile?: string;
  roleIdList: Key[];
  status: number;
  userId: number;
  username: string;
}

export async function query(): Promise<any> {
  return request('/api/users');
}

// export async function queryCurrent(): Promise<any> {
//   return request('/api/currentUser');
// }

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function user() {
  return request('/api/sys/user/info', {
    method: 'GET',
  });
}

export async function queryRule(params?: TableDataParams) {
  return request('/api/sys/user/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: { userIds: number[] }) {
  return request('/api/sys/user/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: addListParams) {
  return request('/api/sys/user/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: updateListParams) {
  return request('/api/sys/user/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
export async function resetPwRule(params: { userId: number }) {
  return request('/api/sys/user/resetPw', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryUserById(params: number) {
  return request(`/api/sys/user/info/${params}`, {});
}
export async function updateUserPassword(params: updatePasswordParams) {
  return request('/api/sys/user/password', {
    method: 'POST',
    data: {
      ...params,
      newPassword: rsa.encrypt(params.newPassword.trim()),
      password: rsa.encrypt(params.password.trim()),
    },
  });
}
