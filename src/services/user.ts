import request from '@/utils/request';
let token = localStorage.getItem('token');
let headers: any = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: token,
};
export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function user() {
  return request('/api/sys/user/info', {
    method: 'GET',
    headers,
  });
}
