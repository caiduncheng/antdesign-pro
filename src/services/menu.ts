import request from '@/utils/request';
import { MenuList, ResponseResult, Menu } from '@/res';
export interface saveMenuParamsType {
  type: number;
  name: string;
  parentId: number;
  url?: string;
  perms?: string;
  orderNum?: number;
  icon?: string;
}

type MenuListResponse = Promise<ResponseResult<MenuList>>;
type MenuResponse = Promise<ResponseResult<Menu>>;

export interface updateMenuParamsType extends saveMenuParamsType {
  menuId: number;
}

/* 获取菜单列表 */
export async function queryMenuList() {
  return request('/api/sys/menu/list', {
    method: 'GET',
  });
}
/* 获取菜单信息 */
export async function queryMenuInfo(menuId: number): MenuResponse {
  return request(`/api/sys/menu/info/${menuId}`, {
    method: 'GET',
  });
}
/* 导航菜单接口 */
export async function queryMenuNav(): MenuListResponse {
  return request('/api/sys/menu/nav', {
    method: 'GET',
  });
}
/* 菜单下拉框选择 */
export async function queryMenuSelect(): MenuResponse {
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
export async function updatedMenu(params: updateMenuParamsType) {
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
