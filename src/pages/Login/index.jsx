import React, {useState} from 'react';
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";

// Actions
import {login} from "../../redux/main/actions/auth.js";

// Components
import MainLayout from "../../components/MainLayout/index.jsx";

// Images
import banner from '../../assets/images/LoginBanner1.png'
import cvsLogo from '../../assets/images/logo-cvs.svg'

// Styles
import { LoginWrapper } from "./local.styles";

// utils
import createNotification from '../../utils/notificationHelper.js';
import {useHistory} from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    const onFinish = async (values) => {
        setIsLoadingLogin(true);
        const { email, password } = values;
        const res = await dispatch(login(email, password));
        if (res?.status === 200 || res?.status === 201) {
            setIsLoadingLogin(false);
            createNotification('success', 'Login success');
            history.push('/home');
        } else {
            setIsLoadingLogin(false);
            createNotification('error', res.error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
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
                                <Button loading={isLoadingLogin} type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button disabled={isLoadingLogin} type="text">
                                    Forgot password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </LoginWrapper>
            </MainLayout>
        </>
    );
}

export default React.memo(Login)