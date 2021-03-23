import request from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
  // mobile: string;
  uuid: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log(params);
  
  return request('/api/portal/login', {
    method: 'POST',
    data: params,
  });
}

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
