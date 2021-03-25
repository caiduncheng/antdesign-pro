import request from '@/utils/request';

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
  'Content-Type': string;
  Accept: string;
  token: string;
};
export async function user() {
  let token = localStorage.getItem('token');
  console.log(token);

  let headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    token: token,
  };
  return request('/api/sys/user/info', {
    method: 'GET',
    headers: headers,
  });
}
