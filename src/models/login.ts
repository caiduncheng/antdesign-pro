import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';
import { login, loginout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, getUUID } from '@/utils/utils';
import { ResponseResult, LoginData } from '@/res';
import { message } from 'antd';

export type StateType = {
  status?: 'account-error' | 'captcha-error' | 'ok';
  tipMsg?: string;
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
    tipMsg: '',
    UUID: getUUID(),
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response: ResponseResult<LoginData> = yield call(login, payload);
      // Login successfully
      if (response.code === '0000') {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        const { token } = response.data;
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
      } else {
        if (response.code === '6033') {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 'captcha-error',
              tipMsg: response.msg,
            },
          });
        } else {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: 'account-error',
              tipMsg: response.msg,
            },
          });
        }
      }
    },
    *logout(_, { call }) {
      const response: ResponseResult = yield call(loginout);
      if (response.code === '0000') {
        const { redirect } = getPageQuery();
        localStorage.removeItem('token');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      } else {
        message.error(response.msg);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');
      return {
        ...state,
        status: payload.status,
        tipMsg: payload.tipMsg,
        // type: payload.type,
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
