import React, {useEffect, useState} from 'react';
import { Avatar, Button, Form, Mentions, Space } from "antd";

// Styles
import {CommentItemWrapper} from "./local.styles.js";

const { getMentions } = Mentions;

function CommentComp() {
    const defaultValue = '@Hải Yến Nguyễn Thị verify';
    // const [comment, setComment] = useState('@Hải Yến Nguyễn Thị verify');
    const [disableSave, setDisableSave] = useState(true);
    const [isEditComment, setIsEditComment] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (defaultValue) {
            setDisableSave(false);
        }
        if (isEditComment) {
            form.setFieldsValue({
                comment: defaultValue,
            })
        }
    }, [isEditComment])

    const onReset = () => {
        form.resetFields();
        setIsEditComment(false)
    };

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const { comment } = values;
            const mentions = getMentions(comment);
            form.resetFields();
            setIsEditComment(false);
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
    };

    const onEdit = () => {
        setIsEditComment(true);
    }

    const onChangeComment = (text) => {
        // setComment(text);
        if (text) {
            setDisableSave(false);
        } else {
            setDisableSave(true)
        }
        form.setFieldsValue({
            comment: text,
        })
    }

    return (
        <CommentItemWrapper>
            <div className={'blockAvatar'}>
                <Avatar size={32}>V</Avatar>
            </div>
            <div className={'commentWrapper'}>
                <div className={'headerComment'}>
                    <p className={'userName'}>Anh Tu</p>
                    <p className={'timeCreated'}>November 25/2024 at 10:27 AM</p>
                </div>
                <div className={'bodyComment'}>
                    {isEditComment ? (
                        <Form form={form} layout="horizontal" onFinish={onFinish}>
                            <Form.Item name={'comment'}>
                                <Mentions
                                    autoSize={{ maxRows: 6, minRows: 2 }}
                                    placeholder="Add comment"
                                    options={[
                                        {
                                            value: 'afc163',
                                            label: 'afc163',
                                        },
                                        {
                                            value: 'zombieJ',
                                            label: 'zombieJ',
                                        },
                                        {
                                            value: 'yesmeck',
                                            label: 'yesmeck',
                                        },
                                    ]}
                                    onChange={onChangeComment}
                                />
                            </Form.Item>
                            {isEditComment ? (
                                <Form.Item>
                                    <Space wrap>
                                        <Button htmlType="submit" type="primary" disabled={disableSave}>
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
                        <p><span className={'mentionItem'}>@Hải Yến Nguyễn Thị</span> verify</p>
                    )}
                </div>
                {!isEditComment && (
                    <div className={'footer'}>
                        <p onClick={onEdit}>Edit</p>
                        <p>Delete</p>
                    </div>
                )}
            </div>
        </CommentItemWrapper>
    )
}

export default React.memo(CommentComp);