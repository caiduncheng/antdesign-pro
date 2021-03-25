import type { Reducer, Effect } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

import { queryMenuList } from '@/services/menu';

export interface MenuStateType {
  menuData: MenuDataItem[];
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

const menuFormatter = (response: any) => {
  if (response === null) {
    return [];
  }
  response = response.filter((item: { type: number }) => item.type != 2);
  // let menuDatas = response.map((item: { name: string; url: string; type: number }) => {
  //   let menuItem = {
  //     children: {},
  //     name: item.name,
  //     // path: item.url,
  //     path: '/sys/user',
  //   };
  //   return menuItem;
  // });
  let menuDatas = [];
  for (let item of response) {
    if (item.parentId === 0) {
      menuDatas.push(item);
    }
    toChildren(menuDatas, item);
  }

  toMenuData(menuDatas);

  return menuDatas;
};
const toChildren = (menuDatas: any, ele: any) => {
  menuDatas.forEach((item: any) => {
    if (item.menuId === ele.parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(ele);
    }
    if (item.children) {
      toChildren(item.children, ele);
    }
  });
};
const toMenuData = (menuDatas: any) => {
  menuDatas = menuDatas.map((item: any) => {
    if (item.children) {
      toMenuData(item.children);
    }
    return {
      children: item.children || [],
      name: item.name,
      path: item.url || '/',
    };
  });

  return menuDatas;
};

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
  },

  effects: {
    *getMenuData(_, { call, put }) {
      const response = yield call(queryMenuList);
      yield put({
        type: 'saveMenuData',
        payload: menuFormatter(response.data.menuList),
      });
    },
  },

  reducers: {
    saveMenuData(state, { payload }) {
      return {
        ...state,
        menuData: payload || [],
      };
    },
  },
};

export default MenuModel;
