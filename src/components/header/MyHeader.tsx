import { UserOutlined } from '@ant-design/icons';
import {Layout, Dropdown, Menu, message, Space, Avatar} from "antd";
import type { MenuProps } from 'antd';
import React from 'react';
import "./header.less";

const handleMenuClick: MenuProps['onClick'] = e => {
    message.info('Click on menu item.').then(r =>  console.log('click', r));
};

const menu = (
    <Menu
        onClick={handleMenuClick}
        items={[
            {
                label: '1st menu item',
                key: '1',
                icon: <UserOutlined />,
            },
            {
                label: '2nd menu item',
                key: '2',
                icon: <UserOutlined />,
            },
            {
                label: '3rd menu item',
                key: '3',
                icon: <UserOutlined />,
            },
        ]}
    />
);

const MyHeader = () => {
    return (
        <Layout.Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo"/>
            <div className="avatar">
                <Space wrap>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar icon={<UserOutlined />} />
                    </Dropdown>
                </Space>
            </div>
        </Layout.Header>
    )
}

export default MyHeader;