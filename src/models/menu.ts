import type { Reducer, Effect } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

import { queryMenuNav } from '@/services/menu';
import { Menu, ResponseResult } from '@/res';

export interface MenuStateType {
  menuData: Menu[];
  normalizedMenu: MenuDataItem[];
}

export type MenuModelType = {
  namespace: string;
  state: MenuStateType;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    saveMenuData: Reducer<MenuStateType>;
  };
};

const normalizeMenu = (menuList: Menu[]): MenuDataItem[] => {
  const res: MenuDataItem[] = [];
  let c: MenuDataItem[];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].list.length > 0) {
      c = normalizeMenu(menuList[i].list);
      res.push({
        children: c,
        name: 'sys',
        path: menuList[i].url ? menuList[i].url : '/',
      });
    } else {
      res.push({
        path: menuList[i].url ? menuList[i].url : '/',
        name: menuList[i].url?.split('/')[1],
        children: menuList[i].list,
      });
    }
  }
  return res;
};

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
    normalizedMenu: []
  },

  effects: {
    *getMenuData(_, { call, put }) {
      const response: ResponseResult<Menu> = yield call(queryMenuNav);
      if (response.code === '0000') {
        yield put({
          type: 'saveMenuData',
          payload: response.data.menuList
        });
      }
    },
  },

  reducers: {
    saveMenuData(state, { payload }) {
      return {
        ...state,
        menuData: payload || [],
        normalizedMenu: normalizeMenu(payload)
      };
    },
  },
};

export default MenuModel;
