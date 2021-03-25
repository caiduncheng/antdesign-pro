import request from '@/utils/request';
let token = localStorage.getItem('token');
let headers: any = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: token,
};
export type menuInfoParamsType = {
  menuId: number;
};
/* 获取菜单列表 */
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    method: 'GET',
    headers: headers,
  });
}
/* 获取菜单信息 */
export async function queryMenuInfo(params: menuInfoParamsType) {
  return request('/api/sys/menu/info/', {
    method: 'GET',
    headers: headers,
    data: params,
  });
}
/* 导航菜单接口 */
export async function queryMenuNav() {
  return request('/api/sys/menu/nav', {
    method: 'GET',
    headers: headers,
  });
}
/* 菜单下拉框选择 */
export async function selectMenu() {
  return request('/api/sys/menu/select', {
    method: 'GET',
    headers: headers,
  });
}
export type saveMenuParamsType = {
  type: number;
  name: string;
  parentId: number;
  url: string | undefined;
  perms: string | undefined;
  orderNum: number | undefined;
  icon: string | undefined;
};
/* 保存菜单 */
export async function saveMenu(params: saveMenuParamsType) {
  return request('/api/sys/menu/save', {
    method: 'POST',
    headers: headers,
    data: params,
  });
}
export type updatedMenuParamsType = {
  menuId: number;
  type: number;
  name: string;
  parentId: number;
  url: string | undefined;
  perms: string | undefined;
  orderNum: number | undefined;
  icon: string | undefined;
};
/* 更新菜单 */
export async function updatedMenu(params: updatedMenuParamsType) {
  return request('/api/sys/menu/update', {
    method: 'POST',
    headers: headers,
    data: params,
  });
}
/* 删除菜单 */
export async function delMenu(params: menuInfoParamsType) {
  return request('/api/sys/menu/delete/', {
    method: 'POST',
    headers: headers,
    data: params,
  });
}
