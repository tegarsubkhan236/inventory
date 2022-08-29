import {MenuProps} from "antd";
import React from "react";
import {
    AppstoreOutlined,
    DashboardOutlined,
    KeyOutlined, LogoutOutlined,
    RiseOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Route, Routes} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../pages/error/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Role from "../pages/user_management/role/Role";
import User from "../pages/user_management/user/user";
import Login from "../pages/auth/Login";

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

export const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/role" element={<Role />} />
              <Route path="/user" element={<User />} />
          </Route>
          <Route path="login" element={<Login />} />
      </Routes>
  )
}

export const items: MenuItem[] = [
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
    getItem('Sign Out', 'login', <LogoutOutlined />),
];

export const rootSubmenuKeys = ['dashboard', 'user_management', 'inventory', 'transaction', 'sign_out'];