import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, getUUID } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  UUID?: string;
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
    changeLoginCapcha: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
    UUID: getUUID(),
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully

      if (response.code === '0000') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        const token = response.data.token;
        localStorage.setItem('token', token);

        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },
    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        localStorage.removeItem('token');
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.code === '0000' ? 'ok' : 'error',
        type: payload.type,
        UUID: getUUID(),
      };
    },
    changeLoginCapcha(state, { payload }) {
      return {
        ...state,
        UUID: payload,
      };
    },
  },
};

export default Model;
