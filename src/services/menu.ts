import request from '@/utils/request';
import { MenuList, ResponseResult } from '@/res';
export interface menuInfoParamsType {
  menuId: number;
}

export interface saveMenuParamsType {
  type: number;
  name: string;
  parentId: number;
  url?: string;
  perms?: string;
  orderNum?: number;
  icon?: string;
}

export interface updatedMenuParamsType extends saveMenuParamsType, menuInfoParamsType {
  menuId: number;
}

/* 获取菜单列表 */
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    method: 'GET',
  });
}
/* 获取菜单信息 */
export async function queryMenuInfo(params: menuInfoParamsType) {
  return request('/api/sys/menu/info/', {
    method: 'GET',
    data: params,
  });
}
/* 导航菜单接口 */
export async function queryMenuNav(): Promise<ResponseResult<MenuList>> {
  return request('/api/sys/menu/nav', {
    method: 'GET',
  });
}
/* 菜单下拉框选择 */
export async function selectMenu() {
  return request('/api/sys/menu/select', {
    method: 'GET',
  });
}

/* 保存菜单 */
export async function saveMenu(params: saveMenuParamsType) {
  return request('/api/sys/menu/save', {
    method: 'POST',
    data: params,
  });
}

/* 更新菜单 */
export async function updatedMenu(params: updatedMenuParamsType) {
  return request('/api/sys/menu/update', {
    method: 'POST',
    data: params,
  });
}
/* 删除菜单 */
export async function delMenu(menuId: number): Promise<ResponseResult> {
  return request(`/api/sys/menu/delete/${menuId}`, {
    method: 'POST',
  });
}

export function queryMenuSelect() {
  return request('/api/sys/menu/select');
}
