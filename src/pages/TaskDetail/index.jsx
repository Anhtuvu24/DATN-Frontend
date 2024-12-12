import React, {useEffect, useState} from 'react';
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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { marked } from "marked";

dayjs.extend(customParseFormat);

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
    ActivityWrapper, MentionLabelWrapper,
} from "./local.styles.js";
import CKEditorCustom from "../../components/CKEditor";
import CommentComp from "../../components/CommentComp";
import TaskInforDetail from "../../components/TaskInforDetail";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTask, updateTask} from "../../redux/main/actions/task.js";
import createNotification from "../../utils/notificationHelper.js";
import {CommentItemWrapper} from "../../components/CommentComp/local.styles.js";
import {getProject} from "../../redux/main/actions/project.js";
import FileComp from "../../components/FileComp";
import {createFile} from "../../redux/main/actions/file.js";
import AvatarCustom from "../../components/AvatarCustom/index.jsx";
import {createComment} from "../../redux/main/actions/comment.js";

const exampleHtml = '## Congratulations on setting up CKEditor 5! 🎉\n' +
    '\n' +
    'You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing capabilities that are customizable and easy to use.';

const { getMentions } = Mentions;

function FileDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const {id: taskId, idProject } = params;
    const task = useSelector(state => state.main.entities.task.currentTask) || {};
    const {
        sprint,
        id_status,
        id_assignee,
        id_reporter,
        no_task,
        name,
        description,
        priority,
        expired_at,
        created_at,
        updated_at,
        files,
        comments
    } = task || {};
    const { project } = sprint || {};
    const me = useSelector(state => state.main.entities.auth.user) || {};
    const users = useSelector(state => state.main.entities.user?.users) || [];
    const optionMentions = users.map(item => {
        return ({
            value: item.id,
            label: <MentionLabelWrapper>
                <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} /> {item?.user_name}
            </MentionLabelWrapper>
        })
    })

    const [editorContent, setEditorContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [nameTask, setNameTask] = useState('');
    const [form] = Form.useForm();

    const itemsBreadcrumb = [
        {
            title: loading ? <Skeleton.Button active={true} size={"small"} /> : 'Projects',
            path: '/home'
        },
        {
            title: loading ? <Skeleton.Button active={true} size={"small"} /> : project?.name,
            path: `/project/${project?.id}`,
        },
        {
            title: loading ? <Skeleton.Button active={true} size={"small"} /> : task?.no_task,
            path: `/task/${taskId}`
        },
    ];

    useEffect(() => {
        const fetchTask = async () => {
            const res = await dispatch(getTask(taskId));
            const resProject = await dispatch(getProject(idProject));
            if (res.status !== 200) {
                createNotification('error', 'An error has occurred');
            } else {
                setLoading(false);
            }
        }
        if (taskId) {
            fetchTask();
        }
    }, [taskId]);

    useEffect(() => {
        if (!loading) {
            setNameTask(name);
            setEditorContent(description);
        }
    }, [loading])

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const onReset = () => {
        form.resetFields();
        setComment('');
    };

    const onFinish = async (values) => {
        try {
            // const values = await form.validateFields();
            const { comment } = values;
            // const mentions = getMentions(comment);
            const res = await dispatch(createComment({id_user: me?.id, id_task: taskId, text: comment}));
            if (res.status !== 201 || res.status !== 200)
            form.resetFields();
            setComment('');
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
    };

    const onClickDescription = () => {
        setIsEditDescription(true);
    };

    const onChangeNameTask = (e) => {
        setNameTask(e.target.value);
    };

    const onBlurChangeName = async (e) => {
        const res = await dispatch(updateTask(taskId, { name: e.target.value }));
        if (res.status !== 200) {
            createNotification('error', 'Changed name fail');
        }
    }

    const onSaveDescription = async () => {
        setIsEditDescription(false);
        const res = await dispatch(updateTask(taskId, { description: editorContent }));
        if (res.status !== 200) {
            createNotification('error', 'Saved description fail');
            setEditorContent(description);
        }
    };

    const onCancelDescription = () => {
        setIsEditDescription(false);
    };

    const onChangeUpload = async ({file, fileList: _fileList}) => {
        setFileList(prev => [...prev, file]);
        const res = await dispatch(createFile({id_task: taskId, files: [file]}));
        if (res.status === 200 || res.status === 201) {
            const _files = fileList.filter(item => item.uid !== file.uid);
            setFileList(_files);
        }
    }

    const onChangeComment = (e) => {
        const value = e.target.value;
        setComment(value);
        form.setFieldsValue({
            comment: value,
        })
    }

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    const renderMarkdown = (markdown) => {
        return { __html: marked(markdown) };
    };

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
                        {loading ? (
                            <Skeleton.Button active={true} size={40} />

                        ) : (
                            <NameTask
                                placeholder="Filled"
                                variant="filled"
                                value={nameTask}
                                onChange={onChangeNameTask}
                                onBlur={onBlurChangeName}
                            />
                        )}

                        <DescriptionWrapper>
                            <h2>Description</h2>
                            {loading ? (
                                <Skeleton style={{ marginTop: 24 }} active={true} />
                            ) : (
                                <>
                                    {isEditDescription ? (
                                        <EditDescriptionWrapper>
                                            <CKEditorCustom content={editorContent} onChange={handleEditorChange} />
                                            <div className={'btnsEditWrapper'}>
                                                <Button disabled={editorContent === description} type={"primary"} onClick={onSaveDescription}>
                                                    Save
                                                </Button>
                                                <Button type={"text"} onClick={onCancelDescription}>Cancel</Button>
                                            </div>
                                        </EditDescriptionWrapper>
                                    ) : (
                                        <DescriptionContent onClick={onClickDescription} dangerouslySetInnerHTML={renderMarkdown(editorContent || 'Add description...')} />
                                    )}
                                </>
                            )}
                        </DescriptionWrapper>
                        <AttachmentsTaskWrapper>
                            <h2>Attachments</h2>
                            <div className={'attachmentList'}>
                                {loading ? (
                                    <>
                                        <Skeleton.Image active={true} size={140} />
                                        <Skeleton.Image active={true} size={140} />
                                        <Skeleton.Image active={true} size={140} />

                                    </>
                                ) : (
                                    <>
                                        {files?.map(item => {
                                            return (
                                                // <div className={'attachment'}>
                                                    <FileComp key={item.id} file={item} size={140} />
                                                    // <div className={'removeBtn'}><IoMdTrash fontSize={18} color={'#f3545d'} /></div>
                                                // </div>
                                            )
                                        })}
                                        {fileList.map((item, index) => {
                                            return <Skeleton.Button style={{ width: '140px !important', height: 140 }} active={true} />
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
                                    </>
                                )}

                            </div>
                        </AttachmentsTaskWrapper>
                        <ActivityWrapper>
                            <h2>Activity</h2>
                            <div className={'typeShow'}>
                                <p>Show: </p>
                                <Radio.Group defaultValue={'comments'}>
                                    {loading ? (
                                        <>
                                            <Skeleton.Button size={"small"} />
                                            <Skeleton.Button size={"small"} />
                                        </>
                                    ) : (
                                        <>
                                            <Radio.Button value={'comments'}>Comments</Radio.Button>
                                            <Radio.Button disabled={true} value={'history'}>History</Radio.Button>
                                        </>
                                    )}
                                </Radio.Group>
                            </div>
                            <div className={'addCommentWrapper'}>
                                <div className={'blockAvatar'}>
                                    {loading ?
                                        <Skeleton.Avatar shape={"circle"} size={32} active={true} />
                                        : <Avatar size={32}>V</Avatar>
                                    }
                                </div>
                                {loading ? (
                                    <Skeleton.Button size={60} />

                                ) : (
                                    <Form form={form} layout="horizontal" onFinish={onFinish}>
                                        <Form.Item name={'comment'}>
                                            <Input.TextArea
                                                value={comment}
                                                autoSize={{ maxRows: 6, minRows: 2 }}
                                                placeholder="Add comment"
                                                disable={loading}
                                                // options={optionMentions}
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
                                )}
                            </div>
                            <div className={'listCommentWrapper'}>
                                {loading ? (
                                    <>
                                        {[1, 2].map((item, index) => {
                                            return (
                                                <CommentItemWrapper key={`fakecomment-${index}`}>
                                                    <div className={'blockAvatar'}>
                                                        <Skeleton.Avatar shape={"circle"} size={32} active={true} />
                                                    </div>
                                                    <div className={'commentWrapper'}>
                                                        <div className={'headerComment'}>
                                                            <Skeleton.Button size={"small"} active={true} />
                                                            <Skeleton.Button size={"small"} active={true} />
                                                        </div>
                                                        <div className={'bodyComment'}>
                                                            <Skeleton.Button size={"large"} active={true} />
                                                        </div>
                                                        <div className={'footer'}>
                                                            <Skeleton.Button size={"small"} active={true}/>
                                                            <Skeleton.Button size={"small"} active={true}/>
                                                        </div>
                                                    </div>
                                                </CommentItemWrapper>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        {comments.map(item => {
                                            return (
                                                <CommentComp item={item} key={item.id} />
                                            )
                                        })}
                                    </>
                                )}
                            </div>
                        </ActivityWrapper>
                    </MainContentWrapper>
                </Splitter.Panel>
                <Splitter.Panel min={240}>
                    <TaskInforDetail loading={loading} />
                </Splitter.Panel>
            </Splitter>
        </FileDetailContainer>
    )
}

export default React.memo(FileDetail);