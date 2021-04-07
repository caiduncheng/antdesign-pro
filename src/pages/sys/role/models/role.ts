import type { Reducer, Effect } from 'umi';
import { queryMenuList } from '@/services/role';
import { ResponseResult, MenuList, Menu } from '@/res';
import { message } from 'antd';
export interface TreeNode {
  title: string;
  key: number;
  children: TreeNode[];
}
export interface RoleStateType {
  treeData: TreeNode[];
  allKey: number[];
}

export type RoleModelType = {
  namespace: string;
  state: RoleStateType;
  effects: {
    getMenu: Effect;
  };
  reducers: {
    changeMenuStatus: Reducer<RoleStateType>;
  };
};
const menuTree = (response: Menu[]) => {
  if (response === null) {
    return [];
  }
  // 树形
  let menuDatas = [];
  for (let item of response) {
    if (item.parentId === 0) {
      menuDatas.push(item);
    }
    toChildren(menuDatas, item);
  }
  // 转参数
  return menuDatas;
};
const menuFormatter = (menuTree: any) => {
  if (menuTree === null) {
    return [];
  }
  // 转参数
  const re = menuTree.map((item: { name: string; menuId: number; children: any }) => {
    const result = {
      title: item.name,
      key: item.menuId,
      children: item.children,
    };
    if (item.children) {
      result.children = menuFormatter(item.children);
    }
    return result;
  });

  return re;
};

const toChildren = (menuDatas: any, ele: any) => {
  menuDatas?.forEach((item: any) => {
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
const ParentKey = (list: number[], tree: TreeNode[]) => {
  tree?.forEach((item: any) => {
    if (item.children) {
      list.push(item.key);
      ParentKey(list, item.children);
    }
  });
};
// 所有key
const allParentKey = (treeData: TreeNode[]) => {
  let allKey: number[] = [];
  treeData.forEach((item) => {
    if (item.children) {
      allKey.push(item.key);
      ParentKey(allKey, item.children);
    }
  });
  return allKey;
};
const Formatter = (menuList: Menu[]) => {
  const tree = menuTree(menuList);
  const treeData: TreeNode[] = menuFormatter(tree);
  return treeData;
};

const RoleModel: RoleModelType = {
  namespace: 'role',

  state: {
    treeData: [],
    allKey: [],
  },

  effects: {
    *getMenu(_, { call, put }) {
      const response: ResponseResult<MenuList> = yield call(queryMenuList);
      // Login successfully
      if (response.code === '0000') {
        yield put({
          type: 'changeMenuStatus',
          payload: Formatter(response.data.menuList),
        });
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    changeMenuStatus(state, { payload }) {
      console.log(payload);

      return {
        ...state,
        treeData: payload,
        allKey: allParentKey(payload),
      };
    },
  },
};

export default RoleModel;
