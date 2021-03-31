import request from '@/utils/request';
import { JSEncrypt } from 'jsencrypt';
import { getRsaPublicKey } from '@/utils/utils';

let token = localStorage.getItem('token');
let headers: any = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: token,
};
const rsa = new JSEncrypt({});
const publicKey = getRsaPublicKey();
rsa.setPublicKey(publicKey);

export type LoginParamsType = {
  username: string;
  password: string;
  uuid: string;
  captcha: string;
};

export function login(params: LoginParamsType) {
  return request(`/api/login`, {
    method: 'POST',
    data: {
      ...params,
      password: rsa.encrypt(`${params.password.trim()}|${params.captcha}`),
    },
  });
}
export function loginout() {
  return request(`/api/logout`, {
    method: 'POST',
    headers,
  });
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
