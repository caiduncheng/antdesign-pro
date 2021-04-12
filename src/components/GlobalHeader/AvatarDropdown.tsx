import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import React from 'react';
import { ConnectProps, history } from 'umi';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import UpdatePassword from './UpdatePassword';
import { updateUserPassword, updatePasswordParams } from '@/services/user';

export type GlobalHeaderRightProps = {
  currentUser: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;
type AvatarDropdownState = {
  modalVisible: boolean;
};
class AvatarDropdown extends React.Component<GlobalHeaderRightProps, AvatarDropdownState> {
  state: AvatarDropdownState = {
    modalVisible: false,
  };
  handlePassword = async (params: updatePasswordParams) => {
    const hide = message.loading('正在修改');
    try {
      const res = await updateUserPassword(params);
      if (res.code === '0000') {
        hide();
        message.success('修改成功');
        return true;
      }
      message.error(res.msg);
      return false;
    } catch (error) {
      message.error('修改失败请重试！');
      return false;
    }
  };
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    // history.push(`/account/${key}`);
    if (key === 'settings') {
      this.setState({ modalVisible: true });
    }
  };

  render(): React.ReactNode {
    const {
      currentUser,
      // = {
      //   avatar: '',
      //   username: '',
      // }
      menu,
    } = this.props;
    const { modalVisible } = this.state;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )} */}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            修改密码
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <div className={styles.usernameContainer}>
              <span className={styles.name}>{currentUser.username}</span>
              <span className={styles.role}>{currentUser.email}</span>
            </div>
            {/* <span className={`${styles.name} anticon`}>{currentUser.username}</span> */}
            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          </span>
        </HeaderDropdown>
        <UpdatePassword
          title="修改密码"
          modalVisible={modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          onSubmit={async (params: updatePasswordParams) => {
            const success = await this.handlePassword(params);
            if (success) {
              history.replace('/user/login');
            }
          }}
          userName={currentUser.username || ''}
        ></UpdatePassword>
      </>
    );
    // : (
    //   <span className={`${styles.action} ${styles.account}`}>
    //     <Spin
    //       size="small"
    //       style={{
    //         marginLeft: 8,
    //         marginRight: 8,
    //       }}
    //     />
    //   </span>
    // );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
