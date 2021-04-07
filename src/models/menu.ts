import type { Reducer, Effect } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

import { queryMenuNav, queryMenuSelect } from '@/services/menu';
import { Menu, ResponseResult } from '@/res';

export interface MenuStateType {
  menuData?: Menu[];
  normalizedMenu?: MenuDataItem[];
  menuSelect?: Menu[];
}

export type MenuModelType = {
  namespace: string;
  state: MenuStateType;
  effects: {
    getMenuData: Effect;
    getMenuSelect: Effect;
  };
  reducers: {
    saveMenuData: Reducer<MenuStateType>;
    saveMenuSelect: Reducer<MenuStateType>;
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
        name: 'system',
        path: menuList[i].url ? menuList[i].url : '',
        icon: `icon-${menuList[i].icon}`,
      });
    } else {
      res.push({
        path: menuList[i].url ? menuList[i].url : '',
        name: menuList[i].url?.split('/')[1],
        children: menuList[i].list,
        icon: `icon-${menuList[i].icon}`,
      });
    }
  }
  return res;
};

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
    normalizedMenu: [],
    menuSelect: [],
  },

  effects: {
    *getMenuData(_, { call, put }) {
      const response: ResponseResult<Menu> = yield call(queryMenuNav);
      if (response.code === '0000') {
        yield put({
          type: 'saveMenuData',
          payload: response.data.menuList,
        });
      }
    },
    *getMenuSelect(_, { call, put }) {
      const response: ResponseResult<Menu> = yield call(queryMenuSelect);
      yield put({
        type: 'saveMenuSelect',
        payload: response.data.menuList,
      });
    },
  },

  reducers: {
    saveMenuData(state, { payload }) {
      return {
        ...state,
        menuData: payload || [],
        normalizedMenu: normalizeMenu(payload),
      };
    },
    saveMenuSelect(state, { payload }) {
      return {
        ...state,
        menuSelect: payload,
      };
    },
  },
};

export default MenuModel;
