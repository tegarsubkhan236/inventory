import {Breadcrumb, Layout} from 'antd';
import "./MainLayout.less";
import MySidebar from "../../components/sidebar/MySidebar";
import MyHeader from "../../components/header/MyHeader";

interface DashboardProps {
    content : JSX.Element
}

const MainLayout = ({content} : DashboardProps) => {
    return (
        <Layout>
            <MyHeader/>
            <Layout>
                <MySidebar/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout.Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '77vh',
                        }}
                    >
                        {content}
                    </Layout.Content>
                </Layout>
            </Layout>
        </Layout>
    );
}


export default MainLayout;