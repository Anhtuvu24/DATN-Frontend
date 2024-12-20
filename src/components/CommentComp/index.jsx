import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input, Mentions, Popconfirm, Space} from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
// Styles
import {CommentItemWrapper} from "./local.styles.js";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../AvatarCustom/index.jsx";
import {deleteComment, updateComment} from "../../redux/main/actions/comment.js";
import createNotification from "../../utils/notificationHelper.js";

const { getMentions } = Mentions;

function CommentComp({ item, isCommentSelect }) {
    const dispatch = useDispatch();
    const { id, text, created_at, updated_at, user } = item;
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [disableSave, setDisableSave] = useState(true);
    const [isEditComment, setIsEditComment] = useState(false);
    const [form] = Form.useForm();

    const me = useSelector(state => state.main.entities.auth.user) || {};

    useEffect(() => {
        if (text) {
            setDisableSave(false);
        }
        if (isEditComment) {
            form.setFieldsValue({
                comment: text,
            })
        }
    }, [isEditComment])

    const onReset = () => {
        form.resetFields();
        setIsEditComment(false)
    };

    const onFinish = async (values) => {
        setIsLoadingUpdate(true);
        try {
            // const values = await form.validateFields();
            const { comment } = values;
            // const mentions = getMentions(comment);
            const res = await dispatch(updateComment(id, comment));
            if (res.status === 200) {
                createNotification('success', 'Updated comment success');
            } else {
                createNotification('error', 'Updated comment fail');
            }
            form.resetFields();
            setIsEditComment(false);
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
        setIsLoadingUpdate(false);
    };

    const onEdit = () => {
        setIsEditComment(true);
    }

    const onChangeComment = (e) => {
        const value = e.target.value;
        // setComment(text);
        if (value) {
            setDisableSave(false);
        } else {
            setDisableSave(true)
        }
        form.setFieldsValue({
            comment: value,
        })
    }

    const onConfirmDelete = async () => {
        const res = await dispatch(deleteComment(id));
        if (res.status === 200) {
            createNotification('success', 'Deleted comment success');
        } else {
            createNotification('error', 'Deleted comment fail');
        }
    }

    return (
        <CommentItemWrapper isCommentSelect={isCommentSelect}>
            <div className={'blockAvatar'}>
                <AvatarCustom size={32} src={user?.avatar || ''} name={user?.user_name || ''} />
            </div>
            <div className={'commentWrapper'}>
                <div className={'headerComment'}>
                    <p className={'userName'}>{user?.user_name}</p>
                    <p className={'timeCreated'}>{dayjs(created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY [at] h:mm A')}</p>
                </div>
                <div className={'bodyComment'}>
                    {isEditComment ? (
                        <Form form={form} layout="horizontal" onFinish={onFinish}>
                            <Form.Item name={'comment'}>
                                <Input.TextArea
                                    autoSize={{ maxRows: 6, minRows: 2 }}
                                    placeholder="Add comment"
                                    onChange={onChangeComment}
                                />
                            </Form.Item>
                            {isEditComment ? (
                                <Form.Item>
                                    <Space wrap>
                                        <Button loading={isLoadingUpdate} htmlType="submit" type="primary" disabled={disableSave}>
                                            Save
                                        </Button>
                                        <Button htmlType="button" type="text" onClick={onReset}>
                                            Cancel
                                        </Button>
                                    </Space>
                                </Form.Item>
                            ) : null}
                        </Form>
                    ) : (
                        <p>{text}</p>
                    )}
                </div>
                {(!isEditComment && user?.id === me.id) && (
                    <div className={'footer'}>
                        <p onClick={onEdit}>Edit</p>
                        <Popconfirm title={'Delete this comment?'} onConfirm={onConfirmDelete}>
                            <p>Delete</p>
                        </Popconfirm>
                    </div>
                )}
            </div>
        </CommentItemWrapper>
    )
}

export default React.memo(CommentComp);