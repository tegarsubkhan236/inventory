import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {useNavigate} from 'react-router-dom'
import "./login.less"
import {login} from "../../service/AuthService";
import {useState} from "react";

const Login = () => {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const onFinish = (values: { username: string; password: string; }) => {
        let username = values.username
        let password = values.password
        setLoading(true);
        login({username, password}).then(() => {
                setLoading(false);
                navigate("/", {replace: true});
            },
        )
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item name="password" rules={[{required: true, message: 'Please input your Password!'}]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                    LOGIN
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;