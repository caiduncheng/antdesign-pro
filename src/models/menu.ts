import type { Reducer, Effect } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { queryMenuNav, queryMenuSelect } from '@/services/menu';
import { Menu, ResponseResult } from '@/res';
import { treeDataTranslate } from '@/utils/utils';

export interface MenuStateType {
  menuData?: Menu[];
  normalizedMenu?: MenuDataItem[];
  menuSelect?: Menu[];
  menuForm?: {
    iconValue: string;
    treeDataValue: number;
    type: number;
  };
  isChange?: boolean;
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
    saveMenuForm: Reducer<MenuStateType>;
    isChangeMenu: Reducer<MenuStateType>;
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
        name: menuList[i].name,
        path: menuList[i].url ? menuList[i].url : '',
        icon: `icon-${menuList[i].icon}`,
      });
    } else {
      res.push({
        path: menuList[i].url ? menuList[i].url : '',
        name: menuList[i].name,
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
    menuForm: {
      treeDataValue: 0,
      iconValue: '',
      type: 0,
    },
    isChange: false,
  },

  effects: {
    *getMenuData({ callback }, { call, put }) {
      const response: ResponseResult<Menu> = yield call(queryMenuNav);

      if (response?.code === '0000') {
        yield put({
          type: 'saveMenuData',
          payload: response.data.menuList,
        });
        sessionStorage.setItem('permissions', JSON.stringify(response.data.permissions || '[]'));
        localStorage.setItem('menu', JSON.stringify(normalizeMenu(response.data.menuList)));
        if (callback && typeof callback === 'function') {
          callback();
        }
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
        isChange: false,
      };
    },

    saveMenuSelect(state, { payload }) {
      return {
        ...state,
        menuSelect: treeDataTranslate(payload),
      };
    },

    saveMenuForm(state, { payload }) {
      return {
        ...state,
        menuForm: {
          ...(state as MenuStateType).menuForm,
          ...payload,
        },
      };
    },
    isChangeMenu(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default MenuModel;
