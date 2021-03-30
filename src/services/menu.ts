import request from '@/utils/request';
export type menuInfoParamsType = {
  menuId: number;
};

export type saveMenuParamsType = {
  type: number;
  name: string;
  parentId: number;
  url: string | undefined;
  perms: string | undefined;
  orderNum: number | undefined;
  icon: string | undefined;
};

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
export async function queryMenuNav() {
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
export async function delMenu(params: menuInfoParamsType) {
  return request('/api/sys/menu/delete/', {
    method: 'POST',
    data: params,
  });
}
