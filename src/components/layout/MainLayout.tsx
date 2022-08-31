import {Layout} from 'antd';
import MySidebar from "../sidebar/MySidebar";
import MyHeader from "../header/MyHeader";
import {Outlet} from "react-router-dom";
import "./MainLayout.less";

const MainLayout = () => {
    return (
        <Layout>
            <MyHeader/>
            <Layout style={{marginTop: 64}}>
                <MySidebar/>
                <Layout style={{padding: '0 24px 24px', margin: '20px 0'}}>
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
