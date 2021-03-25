import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 获取uuid
 */
export function getUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : '8').toString(16);
  });
}

// 密钥
export function getRsaPublicKey(): string {
  return 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtDAhoWampPDDudem2cy+x5xB4avhCZsX/cgmZJxda38sJ/oiORurSt68C50hKlM3QioZwDFFpniyXR+ipt8rL0xKC9LExd2Cf+VG2tZniS4ziYsYCfH5xVzSkDZT/zXE8Kjwq97td4tmH6Ox2qufmRgWQ6n5othEhkCD9DDOG3QIDAQAB';
}
