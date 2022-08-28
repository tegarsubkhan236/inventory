import {Layout} from 'antd';
import "./MainLayout.less";
import MySidebar from "../../components/sidebar/MySidebar";
import MyHeader from "../../components/header/MyHeader";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <Layout>
            <MyHeader/>
            <Layout>
                <MySidebar/>
                <Layout style={{padding: '0 24px 24px', margin: '16px 0'}}>
                    <Layout.Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '77vh',
                        }}
                    >
                        <Outlet/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}


export default MainLayout;
