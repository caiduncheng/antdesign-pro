import request from '@/utils/request';
import { any } from 'prop-types';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
export type headers = {
  'Content-Type': string,
  Accept: string,
  token:string|undefined,
}
export async function user() {
  let headers: any ={
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token:localStorage.getItem("token")||undefined,
    };
  return request('/api/sys/user/info', {
    method: 'GET',
    headers: headers
  })
}