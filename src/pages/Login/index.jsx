import React from 'react';
import { Form, Input, Button } from "antd";

// Components
import MainLayout from "../../components/MainLayout/index.jsx";

// Images
import banner from '../../assets/images/LoginBanner1.png'
import cvsLogo from '../../assets/images/logo-cvs.svg'

// Styles
import { LoginWrapper } from "./local.styles";

function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <MainLayout>
            <LoginWrapper>
                <div className={'banner'}>
                    <div>
                        <img src={banner} alt={'banner'} />
                    </div>
                </div>
                <div className={'formLogin'}>
                    <img width={300} src={cvsLogo} alt={'cvs-logo'}/>
                    <div className={'loginTitle'}>
                        <h3>Login CVS-TM</h3>
                        <p>Please enter login details below</p>
                    </div>
                    <Form
                        name="basic"
                        labelAlign={'left'}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            width: '100%'
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input type={'email'} placeholder={'Enter Email'} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder={'Enter password'} />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="text">
                                Forgot password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </LoginWrapper>
        </MainLayout>
    );
}

export default React.memo(Login)