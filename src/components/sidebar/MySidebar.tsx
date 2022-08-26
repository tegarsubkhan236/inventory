import {Layout, Menu, MenuProps} from "antd";
import React, {useState} from "react";
import {
    AppstoreOutlined,
    RiseOutlined,
    TeamOutlined,
    UserOutlined,
    KeyOutlined,
    DashboardOutlined,
    LogoutOutlined
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

const items: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('User Management', 'user_management',<TeamOutlined />, [
        getItem('User', 'user', <UserOutlined />),
        getItem('Role', 'role', <KeyOutlined />),
    ]),
    getItem('Inventory', 'inventory', <AppstoreOutlined/>, [
        getItem('Product Category', 'product_category'),
        getItem('Product', 'product'),
        getItem('Warehouse', 'warehouse'),
        getItem('Etalage', 'etalage'),
    ]),
    getItem('Transaction', 'transaction', <RiseOutlined />, [
        getItem('Pre Order', 'pre_order'),
    ]),
    getItem('Sign Out', 'sign_out', <LogoutOutlined />),
];

const rootSubmenuKeys = ['dashboard', 'user_management', 'inventory', 'transaction', 'sign_out'];

const MySidebar = () => {
    const [openKeys, setOpenKeys] = useState(['dashboard']);
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Layout.Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                defaultSelectedKeys={['dashboard']}
                defaultOpenKeys={['dashboard']}
                style={{height: '100%', borderRight: 0}}
                items={items}
            />
        </Layout.Sider>
    )
}

export default MySidebar;