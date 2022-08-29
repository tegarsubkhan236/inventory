import {UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Image, Layout, Menu, message, Space} from "antd";
import React from 'react';
import "./header.less";
import {logout} from "../../data/AuthData";

const handleMenuClick: MenuProps['onClick'] = e => {
    switch (e.key) {
        case "1" :
            logout()
            break;
        default : message.info('Click on menu item.');
    }
};

const menu = (
    <Menu
        onClick={handleMenuClick}
        items={[
            {
                label: 'Logout',
                key: '1',
                icon: <UserOutlined/>,
            },
            {
                label: '2nd menu item',
                key: '2',
                icon: <UserOutlined/>,
            },
            {
                label: '3rd menu item',
                key: '3',
                icon: <UserOutlined/>,
            },
        ]}
    />
);

const MyHeader = () => {
    return (
        <Layout.Header className="header">
            <div className="logo">
                <Image
                    width={120}
                    height={40}
                    preview={false}
                    style={{margin: "16px 24px 16px 0"}}
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvlhE6Uq0BunRHumlg5o_PgxbYVQjBb3q0A&usqp=CAU"}
                />
            </div>
            <div className="avatar">
                <Space wrap>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar icon={<UserOutlined/>}
                                src={"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"}/>
                    </Dropdown>
                </Space>
            </div>
        </Layout.Header>
    )
}

export default MyHeader;