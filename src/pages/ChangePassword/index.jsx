import React, { useState } from 'react';
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

// Actions
import { changePassword } from "../../redux/main/actions/user.js";

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

function ChangePassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const userId = query.get('userId');
    const hashpassword = query.get('password');
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        const { newPassword, confirmPassword } = values;
        const res = await dispatch(changePassword(userId, hashpassword, newPassword));
        if (res?.status === 200 || res?.status === 201) {
            setIsLoading(false);
            createNotification('success', 'Changed password success');
            history.push('/login');
        } else {
            setIsLoading(false);
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
                        <img width={300} src={cvsLogo} alt={'cvs-logo'} />
                        <div className={'loginTitle'}>
                            {/*<h3>Change password before working</h3>*/}
                            <p>Change password before working</p>
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
                                label="New password"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: 'Include 8 characters, at least 1 uppercase letter, 1 number, and 1 special character.',
                                    },
                                ]}
                            >
                                <Input.Password placeholder={'Enter new password'} />
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={'Enter confirm password'} />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button loading={isLoading} type="primary" htmlType="submit">
                                    Change password
                                </Button>
                            </Form.Item>
                            {/*<Form.Item label={null}>*/}
                            {/*    <Button disabled={isLoadingLogin} type="text">*/}
                            {/*        Forgot password*/}
                            {/*    </Button>*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </div>
                </LoginWrapper>
            </MainLayout>
        </>
    );
}

export default React.memo(ChangePassword);