import React, { useState } from 'react';
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

// Actions
import {changePassword, forgotPassword} from "../../redux/main/actions/user.js";

// Components
import MainLayout from "../../components/MainLayout/index.jsx";

// Images
import banner from '../../assets/images/LoginBanner1.png';
import cvsLogo from '../../assets/images/logo-cvs.svg';

// Styles
import { LoginWrapper } from "./local.styles";

// utils
import createNotification from '../../utils/notificationHelper.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        const { gmail } = values;
        const res = await dispatch(forgotPassword(gmail));
        if (res?.status === 200 || res?.status === 201) {
            setIsLoading(false);
            createNotification('success', 'Check your gmail to reset password');
            history.push('/login');
        } else {
            setIsLoading(false);
            createNotification('error', res.error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onClickLogin = () => {
        history.push('/login');
    }

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
                        <img width={300} src={cvsLogo} alt={'cvs-logo'} />
                        <div className={'loginTitle'}>
                            <h3>Reset password</h3>
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
                                label="Gmail"
                                name="gmail"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input type={'email'} placeholder={'Enter your email'} />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button loading={isLoading} type="primary" htmlType="submit">
                                    Reset password
                                </Button>
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button onClick={onClickLogin}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </LoginWrapper>
            </MainLayout>
        </>
    );
}

export default React.memo(ForgotPassword);