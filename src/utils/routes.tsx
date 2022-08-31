import React from "react";
import {MenuProps} from "antd";
import {
    AppstoreOutlined,
    DashboardOutlined,
    KeyOutlined,
    LogoutOutlined,
    RiseOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
        type,
    } as MenuItem;
}

export const items: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined/>),
    getItem('User Management', 'user_management', <TeamOutlined/>, [
        getItem('User', 'user', <UserOutlined/>),
        getItem('Role', 'role', <KeyOutlined/>),
    ]),
    getItem('Inventory', 'inventory', <AppstoreOutlined/>, [
        getItem('Product Category', 'product_category'),
        getItem('Product', 'product'),
        getItem('Warehouse', 'warehouse'),
        getItem('Etalage', 'etalage'),
    ]),
    getItem('Transaction', 'transaction', <RiseOutlined/>, [
        getItem('Pre Order', 'pre_order'),
    ]),
    getItem('Sign Out', 'login', <LogoutOutlined/>),
];

export const rootSubmenuKeys = ['dashboard', 'user_management', 'inventory', 'transaction', 'sign_out'];