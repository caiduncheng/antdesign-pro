import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
// import { getFakeCaptcha } from '@/services/login';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
  uuid: string;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
              borderColor: '#17242F',
              background: '#17242F',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
        className={styles.btn}
      >
        {status === 'error' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误（admin/ant.design)',
            })}
          />
        )}
        <ProFormText
          name="userName"
          style={{ background: '#f7f7f7', borderRadius: '3px', border: '1px solid #f7f7f7' }}
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.username.placeholder',
            defaultMessage: '请输入账号',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.login.username.required" defaultMessage="请输入账号!" />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          style={{ background: '#f7f7f7', borderRadius: '3px', border: '1px solid #f7f7f7' }}
          fieldProps={{
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.password.placeholder',
            defaultMessage: '请输入密码',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                  defaultMessage="请输入密码！"
                />
              ),
            },
          ]}
        />

        {status === 'error' && !submitting && <LoginMessage content="验证码错误" />}
        <ProFormText
          name="captcha"
          className={styles.proInput}
          style={{
            width: '55%',
            background: '#f7f7f7',
            borderRadius: '3px',
            border: '1px solid #f7f7f7',
          }}
          fieldProps={{
            size: 'large',
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.captcha.placeholder',
            defaultMessage: '请输入验证码',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.captcha.required"
                  defaultMessage="请输入验证码！"
                />
              ),
            },
          ]}
        />
        <img src="https://192.168.35.175/npnserver/captcha.jpg?uuid='1234'" alt="captcha" />
        {/* <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <MailTwoTone className={styles.prefixIcon} />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.captcha.placeholder',
            defaultMessage: '请输入验证码',
          })}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${intl.formatMessage({
                id: 'pages.getCaptchaSecondText',
                defaultMessage: '获取验证码',
              })}`;
            }
            return intl.formatMessage({
              id: 'pages.login.phoneLogin.getVerificationCode',
              defaultMessage: '获取验证码',
            });
          }}
          name="captcha"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.captcha.required"
                  defaultMessage="请输入验证码！"
                />
              ),
            },
          ]}
          onGetCaptcha={async (mobile) => {
            const result = await getFakeCaptcha(mobile);
            if (result === false) {
              return;
            }
            message.success('获取验证码成功！验证码为：1234');
          }}
        /> */}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="记住密码" />
          </ProFormCheckbox>
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
