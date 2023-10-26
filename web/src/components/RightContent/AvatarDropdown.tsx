import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { setAlpha } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const Name = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return <h4>{currentUser?.fullName}</h4>;
};

const AvatarLogo = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    };
  });

  return (
    <Avatar size="small" className={avatarClassName} src={currentUser?.photoUrl} alt="avatar" />
  );
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;

      if (key === 'center') {
        history.push('/user/profile');
      }

      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });

        loginOut();
        localStorage.removeItem('token');
        localStorage.removeItem('access');
        return;
      }
      // history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      {/* <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      /> */}
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser?.fullName) {
    return loading;
  }

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    // {
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   label: 'Settings'
    // },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
