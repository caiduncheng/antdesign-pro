import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import { getUUID } from '@/utils/utils';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
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
  const { status, tipMsg, UUID } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  const handleCaptchaClick = () => {
    const { dispatch } = props;
    dispatch({
      type: 'login/changeLoginCapcha',
      payload: getUUID(),
    });
  };

  if (status != 'ok') {
    handleCaptchaClick;
  }

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
            },
          },
        }}
        onFinish={(values) => {
          // values.uuid = UUID;
          values.uuid = UUID;
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
        className={styles.btn}
      >
        {status === 'account-error' && !submitting && (
          <LoginMessage
            // content={intl.formatMessage({
            //   id: 'pages.login.accountLogin.errorMessage',
            //   defaultMessage: tipMsg,
            // })}
            content={tipMsg || ''}
          />
        )}
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.username.placeholder',
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
          fieldProps={{
            size: 'large',
            prefix: <UnlockOutlined className={styles.prefixIcon} />,
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

        {status === 'captcha-error' && !submitting && <LoginMessage content="验证码错误" />}
        <div className={styles.captcha}>
          <ProFormText
            name="captcha"
            style={{
              width: 20,
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
          <div className={styles.captImg} onClick={handleCaptchaClick}>
            <img src={`/api/captcha.jpg?uuid=${UUID}`} alt="captcha" />
          </div>
        </div>
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
          {/* <ProFormCheckbox noStyle name="autoLogin" className={styles.check}>
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="记住密码" />
          </ProFormCheckbox> */}
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
