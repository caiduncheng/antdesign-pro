import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  // mobile: string;
  uuid: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/sys/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
