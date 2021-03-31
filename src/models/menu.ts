import type { Reducer, Effect } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

import { queryMenuNav } from '@/services/menu';
import { Menu, ResponseResult } from '@/res';

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
  // for (let item of response) {
  //   if (item.parentId === 0) {
  //     menuDatas.push(item);
  //   }
  //   toChildren(menuDatas, item);
  // }
  menuDatas = response.map((item: any) => {
    if (item.children) {
      return toMenuData(item.children);
    }
    return {
      children: item.list || [],
      name: item.name,
      path: item.url || '/',
    };
  });
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
    // if (item.children) {
    //   toMenuData(item.children);
    // }
    return item.children
      ? toMenuData(item.children)
      : {
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
      const response: ResponseResult<Menu> = yield call(queryMenuNav);
      yield put({
        type: 'saveMenuData',
        payload: normalizeMenu(response.data.menuList),
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
