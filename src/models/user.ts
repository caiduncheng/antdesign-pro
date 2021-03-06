import type { Effect, Reducer } from 'umi';

import { user } from '@/services/user';
import { message } from 'antd';

// export type CurrentUser = {
//   avatar?: string;
//   name?: string;
//   title?: string;
//   group?: string;
//   signature?: string;
//   tags?: {
//     key: string;
//     label: string;
//   }[];
//   userid?: string;
//   unreadCount?: number;
//   role?: string;
// };
export type CurrentUser = {
  userId?: number;
  username?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  status?: number;
  preInstallSign?: number;
  creTime?: string;
  roleIdList?: Array<number>;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    // fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      avatar: 'https://caidc.oss-cn-beijing.aliyuncs.com/avatar.c58e465.png',
    },
  },

  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    *fetchCurrent({ callback }, { call, put }) {
      const response = yield call(user);
      if (response?.code === '0000') {
        yield put({
          type: 'saveCurrentUser',
          payload: response?.data,
        });
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
      // else {
      //   message.error(response?.msg);
      // }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: { ...state?.currentUser, ...action.payload },
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
