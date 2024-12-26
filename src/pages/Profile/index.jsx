import React, {useEffect, useState} from 'react';
import { MdOutlineTransgender, MdOutlinePermIdentity, MdOutlineEmail } from "react-icons/md";

// Styles
import {AboutItem, ProfileWrapper, UserName} from "./local.styles.js";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../../components/AvatarCustom/index.jsx";
import {Button, Form, Input, Select, Skeleton, Space, Upload} from "antd";
import {getMe, uploadAvatar} from "../../redux/main/actions/auth.js";
import createNotification from "../../utils/notificationHelper.js";
import {updateUser} from "../../redux/main/actions/user.js";
import Priority from "../../components/Priority";
import {useHistory} from "react-router-dom";
import cvsLogo from "../../assets/images/logo-cvs.svg";

function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [visibleChangePassword, setVisibleChangePassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [gmail, setGmail] = useState('');
    const [fileList, setFileList] = useState([]);
    const me = useSelector(state => state.main.entities.auth.user) || {};
    const tasks = me.tasks || [];
    const projects = me.projects || [];
    const dataNone = me?.user_name;

    useEffect(() => {
        dispatch(getMe());
    }, [])

    useEffect(() => {
        if (me?.user_name) {
            setUserName(me?.user_name);
        }
        if (me?.gender) {
            setGender(me?.gender);
        }
        if (me?.role) {
            setRole(me?.role);
        }
        if (me?.gmail) {
            setGmail(me?.gmail);
        }
    }, [me])

    const handleChangeUpload = async ({ file, fileList: newFileList }) => {
        if (newFileList?.length) {
            setFileList(newFileList);
            const res = await dispatch(uploadAvatar(me.id, newFileList[0].originFileObj));
            if (res.status !== 200) {
                createNotification('error', 'Upload avatar fail');
            }
            setFileList([])
        }
    };

    const onBlurChangeName = async (e) => {
        const res = await dispatch(updateUser(me?.id, { user_name: e.target.value }));
        if (res.status !== 200) {
            createNotification('error', 'Changed name fail');
        }
    }

    const onChangeName = (e) => {
        const value = e.target.value;
        setUserName(value);
    }

    const onChangeGender = async (value) => {
        setGender(value);
        const res = await dispatch(updateUser(me?.id, { gender: value }));
        if (res.status !== 200) {
            createNotification('error', 'Changed gender fail');
            setGender(me?.gender);
        }
    }

    const onClickTaskItem = (item) => {
        history.push(`/project/${item?.sprint?.id_project}/task/${item?.id}`);
    }

    const onClickProjectItem = (item) => {
        history.push(`/project/${item?.id}`);
    }

    const onClickChangePassword = () => {
        setVisibleChangePassword(true);
    }

    const onCancelChangePassword = () => {
        setVisibleChangePassword(false);
    }

    const onFinish = async (values) => {
        setIsChangePassword(true);
        const { currentPassword, newPassword } = values;
        const res = await dispatch(updateUser(me?.id, {
            password: newPassword,
            current_password: currentPassword,
        }));
        if (res.status === 200) {
            createNotification('success', 'Change password success');
            setVisibleChangePassword(false);
        } else {
            createNotification('error', res.error);
        }
        setIsChangePassword(false);
    }

    return (
        <ProfileWrapper>
            <div className={'profileContent'}>
                <div className={'profileHeader'}>
                    <div className={'boxAvatar'}>
                        <div>
                            {dataNone ? (
                                <Upload
                                    accept='.jpg,.png,.jpeg'
                                    listType="picture-circle"
                                    showUploadList={false}
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    fileList={fileList}
                                    onChange={handleChangeUpload}
                                >
                                    {fileList.length >= 1 ? (
                                        <Skeleton.Avatar size={128} active={true} />
                                    ) : (
                                        <AvatarCustom size={128} src={me?.avatar} name={me?.user_name} />
                                    )}
                                </Upload>
                            ) : (
                                <Skeleton.Avatar size={128} active={true} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={'profileBody'}>
                    <div className={'leftWrapper'}>
                        {dataNone ? (
                            <UserName
                                placeholder="Filled"
                                variant="filled"
                                defaultValue={me?.user_name}
                                value={userName}
                                onChange={onChangeName}
                                onBlur={onBlurChangeName}
                            />
                        ) : (
                            <Skeleton.Button size={"large"} active={true} />
                        )}
                        <div className={'aboutUser'}>
                            <AboutItem>About</AboutItem>
                            <AboutItem>
                                <MdOutlineTransgender color={'#6B778C'} fontSize={24} />
                                {dataNone ? (
                                    <Select
                                        placeholder="Gender"
                                        variant="filled"
                                        defaultValue={me?.gender}
                                        value={gender}
                                        onChange={onChangeGender}
                                        options={[
                                            {
                                                value: 'male',
                                                label: 'Male',
                                            },
                                            {
                                                value: 'female',
                                                label: 'Female',
                                            },
                                            {
                                                value: 'other',
                                                label: 'Other',
                                            },
                                        ]}
                                    />
                                ) : (
                                    <Skeleton.Input size={"default"} active={true} />
                                )}
                            </AboutItem>
                            <AboutItem>
                                <MdOutlinePermIdentity color={'#6B778C'} fontSize={24} />
                                {dataNone ? (
                                    <Input
                                        placeholder="Role"
                                        variant="filled"
                                        defaultValue={me?.role}
                                        value={role}
                                        disabled={true}
                                    />
                                ) : (
                                    <Skeleton.Input size={"default"} active={true} />
                                )}
                            </AboutItem>
                            <AboutItem>
                                <MdOutlineEmail color={'#6B778C'} fontSize={24} />
                                {dataNone ? (
                                    <Input
                                        disabled={true}
                                        placeholder="Email"
                                        variant="filled"
                                        defaultValue={me?.gmail}
                                        value={gmail}
                                    />
                                ) : (
                                    <Skeleton.Input size={"default"} active={true} />
                                )}
                            </AboutItem>
                            {visibleChangePassword ? (
                                <AboutItem>
                                    <Form
                                        onFinish={onFinish}
                                        name="basic"
                                        style={{
                                            maxWidth: 600,
                                            width: '100%'
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="currentPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your currrent password!',
                                                },

                                            ]}
                                        >
                                            <Input.Password placeholder={'Enter current password'} />
                                        </Form.Item>

                                        <Form.Item
                                            name="newPassword"
                                            dependencies={['currentPassword']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your new password!',
                                                },
                                                {
                                                    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message: 'Include 8 characters, at least 1 uppercase letter, 1 number, and 1 special character.',
                                                },
                                                // ({ getFieldValue }) => ({
                                                //     validator(_, value) {
                                                //         if (!value || getFieldValue('currentPassword') === value) {
                                                //             return Promise.resolve();
                                                //         }
                                                //         return Promise.reject(new Error('The two passwords do not match!'));
                                                //     },
                                                // }),
                                            ]}
                                        >
                                            <Input.Password placeholder={'Enter new password'} />
                                        </Form.Item>

                                        <Form.Item label={null}>
                                            <Space wrap>
                                                <Button loading={isChangePassword} type="primary" htmlType="submit">
                                                    Save
                                                </Button>
                                                <Button onClick={onCancelChangePassword} type="text">
                                                    Cancel
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                    </Form>
                                </AboutItem>
                            ) : (
                                <AboutItem>
                                    <Button onClick={onClickChangePassword}>Change password</Button>
                                </AboutItem>
                            )}
                        </div>
                    </div>
                    <div className={'rightWrapper'}>
                        <div className={'tasksWrapper'}>
                            <h3>Worked on</h3>
                            <div className={'listItem'}>
                                {tasks?.length ? (
                                    <>
                                        {tasks?.map(item => {
                                            return (
                                                <div className={'taskItem'} onClick={() => onClickTaskItem(item)}>
                                                    <Priority size={24} type={item?.priority} />
                                                    <p>{item.name}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <div className={'emptyResult'}>
                                        <svg width="150" height="110" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                        <p>No data</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={'projectsWrapper'}>
                            <h3>Places you work in</h3>
                            <div className={'listItem'}>
                                {projects?.length ? (
                                    <>
                                        {projects?.map(item => {
                                            return (
                                                <div className={'projectItem'} onClick={() => onClickProjectItem(item)}>
                                                    <AvatarCustom name={item.name} src={item.icon} type={'square'} size={24}/>
                                                    <p>{item.name}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <div className={'emptyResult'}>
                                        <svg width="150" height="110" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                        <p>No data</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileWrapper>
    )
}

export default Profile;