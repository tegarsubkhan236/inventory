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
        getItem('User', 'user_management/user', <UserOutlined/>),
        getItem('Role', 'user_management/role', <KeyOutlined/>),
    ]),
    getItem('Inventory', 'inventory', <AppstoreOutlined/>, [
        getItem('Product Category', 'inventory/product_category'),
        getItem('Product', 'inventory/product'),
        getItem('Warehouse', 'inventory/warehouse'),
        getItem('Etalage', 'inventory/etalage'),
    ]),
    getItem('Transaction', 'transaction', <RiseOutlined/>, [
        getItem('Pre Order', 'pre_order'),
    ]),
    getItem('Sign Out', 'login', <LogoutOutlined/>),
];

export const rootSubmenuKeys = ['dashboard', 'user_management', 'inventory', 'transaction', 'sign_out'];