import {UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Image, Layout, Menu, Space} from "antd";
import "./header.less";
import {logout} from "../../service/AuthService";

const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === "1"){
        logout()
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