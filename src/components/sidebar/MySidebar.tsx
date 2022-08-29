import {Layout, Menu, MenuProps} from "antd";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {items, rootSubmenuKeys} from "../../utils/routes";

const MySidebar = () => {
    let navigate = useNavigate();
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
                onClick={(e)=>navigate("/"+e.key, {replace : true})}
            />
        </Layout.Sider>
    )
}

export default MySidebar;
