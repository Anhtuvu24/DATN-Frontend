import React, {useState} from 'react';
import {
    Splitter,
    Breadcrumb,
    Button,
    Input,
    Upload,
    Skeleton,
    Image,
    Radio,
    Avatar,
    Mentions,
    Form,
    Space
} from 'antd';
import { MdAdd } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

// Images
import testImage from '../../assets/images/LoginBanner1.png';

// Styles
import {
    EditDescriptionWrapper,
    FileDetailContainer,
    MainContentWrapper,
    DescriptionWrapper,
    DescriptionContent,
    NameTask,
    AttachmentsTaskWrapper,
    ActivityWrapper,
} from "./local.styles.js";
import CKEditorCustom from "../../components/CKEditor";
import CommentComp from "../../components/CommentComp";
import TaskInforDetail from "../../components/TaskInforDetail";
import {useHistory} from "react-router-dom";

const exampleHtml = '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>';

const listUser = [{ value: 'sample', label: 'sample' }];

const { getMentions } = Mentions;

const itemsBreadcrumb = [
    {
        title: 'Projects',
        path: '/home'
    },
    {
        title: 'Software Development',
        path: '/project/1'
    },
    {
        title: 'SD-1',
        path: '/task/1'
    },
];

function FileDetail() {
    const history = useHistory();
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [nameTask, setNameTask] = useState('Lỗi tự động quay lại tổ chức mặc định khi đăng nhập trên Docbase');
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
        setComment('');
    };

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const { comment } = values;
            const mentions = getMentions(comment);
            form.resetFields();
            setComment('');
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
    };

    const onDoubleClickDescription = () => {
        setIsEditDescription(true);
    };

    const onChangeNameTask = (e) => {
        setNameTask(e.target.value);
    };

    const onBlueChangeName = (e) => {
        console.log(e.target.value)
    }

    const onSaveDescription = () => {
        setIsEditDescription(false);
    };

    const onCancelDescription = () => {
        setIsEditDescription(false);
    };

    const onChangeUpload = ({file, fileList: _fileList}) => {
        setFileList(prev => [...prev, file]);
        setIsUploading(true);
    }

    const onChangeComment = (text) => {
        setComment(text);
        form.setFieldsValue({
            comment: text,
        })
    }

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    return (
        <FileDetailContainer>
            <Splitter
                style={{
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel defaultSize="70%" min="50%" max="90%">
                    <MainContentWrapper>
                        <Breadcrumb>
                            {itemsBreadcrumb.map(item => {
                                return (
                                    <Breadcrumb.Item onClick={() => onClickBreadcrumb(item.path)}>{item.title}</Breadcrumb.Item>
                                )
                            })}
                        </Breadcrumb>
                        <NameTask
                            placeholder="Filled"
                            variant="filled"
                            value={nameTask}
                            onChange={onChangeNameTask}
                            onBlur={onBlueChangeName}
                        />
                        <DescriptionWrapper>
                            <h2>Description</h2>
                            {isEditDescription ? (
                                <EditDescriptionWrapper>
                                    <CKEditorCustom content={exampleHtml} />
                                    <div className={'btnsEditWrapper'}>
                                        <Button type={"primary"} onClick={onSaveDescription}>Save</Button>
                                        <Button type={"text"} onClick={onCancelDescription}>Cancel</Button>
                                    </div>
                                </EditDescriptionWrapper>
                            ) : (
                                <DescriptionContent onDoubleClick={onDoubleClickDescription} dangerouslySetInnerHTML={{ __html: exampleHtml  || '<p>Add description...</p>' }} />
                            )}
                        </DescriptionWrapper>
                        <AttachmentsTaskWrapper>
                            <h2>Attachments</h2>
                            <div className={'attachmentList'}>
                                <div className={'attachment'}>
                                    <Image src={testImage} alt={'Attachment image'} />
                                    <div className={'removeBtn'}><IoMdTrash fontSize={18} color={'#f3545d'} /></div>
                                </div>
                                <div className={'attachment'}>
                                    <Image src={testImage} alt={'Attachment image'} />
                                    <div className={'removeBtn'}><IoMdTrash fontSize={18} color={'#f3545d'} /></div>
                                </div>
                                <div className={'attachment'}>
                                    <Image src={testImage} alt={'Attachment image'} />
                                    <div className={'removeBtn'}><IoMdTrash fontSize={18} color={'#f3545d'} /></div>
                                </div>
                                {fileList.map((item, index) => {
                                    return <Skeleton.Button style={{ width: 140, height: 140 }} active={true} />
                                })}
                                <Upload
                                    accept='.jpg,.png,.jpeg'
                                    onChange={onChangeUpload}
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    multiple={true}
                                >
                                    <div className={'attachmentAdd'}>
                                        <MdAdd fontSize={30} color={'#637381'} />
                                    </div>
                                </Upload>
                            </div>
                        </AttachmentsTaskWrapper>
                        <ActivityWrapper>
                            <h2>Activity</h2>
                            <div className={'typeShow'}>
                                <p>Show: </p>
                                <Radio.Group defaultValue={'comments'}>
                                    <Radio.Button value={'comments'}>Comments</Radio.Button>
                                    <Radio.Button disabled={true} value={'history'}>History</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div className={'addCommentWrapper'}>
                                <div className={'blockAvatar'}>
                                    <Avatar size={32}>V</Avatar>
                                </div>
                                <Form form={form} layout="horizontal" onFinish={onFinish}>
                                    <Form.Item name={'comment'}>
                                        <Mentions
                                            value={comment}
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
                                    {comment ? (
                                        <Form.Item>
                                            <Space wrap>
                                                <Button htmlType="submit" type="primary">
                                                    Save
                                                </Button>
                                                <Button htmlType="button" type="text" onClick={onReset}>
                                                    Cancel
                                                </Button>
                                            </Space>
                                        </Form.Item>
                                    ) : null}
                                </Form>
                            </div>
                            <div className={'listCommentWrapper'}>
                                {[1, 2].map(item => {
                                    return (
                                        <CommentComp />
                                    )
                                })}
                            </div>
                        </ActivityWrapper>
                    </MainContentWrapper>
                </Splitter.Panel>
                <Splitter.Panel min={240}>
                    <TaskInforDetail />
                </Splitter.Panel>
            </Splitter>
        </FileDetailContainer>
    )
}

export default React.memo(FileDetail);