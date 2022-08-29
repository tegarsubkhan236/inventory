import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {useNavigate} from 'react-router-dom'
import "./login.less"
import React from 'react';
import {login} from "../../data/AuthData";

interface MessageProps {
    loginText?: string,
    registerText?: string
}

const Login = ({loginText = "LOGIN"}: MessageProps) => {
    let navigate = useNavigate();
    const onFinish = (values: any) => {
        login(values).then(
            () => {
                navigate("/", { replace: true });
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    {loginText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;