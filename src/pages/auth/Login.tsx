import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import "./login.less"
import React from 'react';
import {Link} from "react-router-dom";

interface MessageProps {
    loginText? : string,
    registerText? : string
}
const Login = ({loginText = "LOGIN", registerText = "REGISTER"} : MessageProps) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                <Link to="/">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {loginText}
                    </Button>
                </Link>
                Or <a href="">{registerText}</a>
            </Form.Item>
        </Form>
    );
};

export default Login;