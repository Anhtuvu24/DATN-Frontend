import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Breadcrumb,
    Button,
    Input,
    Dropdown,
    Modal,
    Form,
    Space,
    DatePicker,
    Select,
    Upload,
    Popconfirm, Skeleton
} from "antd";
import { SlOptions } from "react-icons/sl";
import { MdOutlineSearch, MdUpload } from "react-icons/md";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment";
import dayjs from 'dayjs';

// Components
import CKEditorCustom from "../../components/CKEditor/index.jsx";

// Styles
import {
    EmptySprintWrapper,
    FormCreateTask,
    FormEditSprint,
    ListFileWrapper,
    ProjectDetailWrapper,
    SelectOptionItem,
    StatusesWrapperLoading, StatusWrapperLoading,
    UploadAreaWrapper,
    UserItem
} from './local.styles.js';
import StatusesTask from "./StatusesTask";
import Tasks from "./Tasks";
import FileComp from "../../components/FileComp";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProject} from "../../redux/main/actions/project.js";
import {completeSprint, createSprint, updateSprint} from "../../redux/main/actions/sprint.js";
import createNotification from "../../utils/notificationHelper.js";
import {createTask, getTasks, updateOrderTask} from "../../redux/main/actions/task.js";
import AvatarCustom from "../../components/AvatarCustom/index.jsx";
import Issues from "./Issues/Issues.jsx";

const items = [
    {
        key: 'edit_sprint',
        label: <p>Edit sprint</p>,
    },
];

const priorityOption = [
    {
        value: 'low',
        label: <span>Low</span>
    },
    {
        value: 'medium',
        label: <span>Medium</span>
    },
    {
        value: 'high',
        label: <span>High</span>
    },
]

const { Option } = Select;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const disabledDate = (current) => {
    // Không cho phép chọn ngày trước ngày hôm nay
    return current && current < moment().startOf("day");
};

function Project() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const projectId = params.id;

    const [isGetProject, setIsGetProject] = useState(false);
    const [isCreateTask, setIsCreateTask] = useState(false);
    const [isGetTasks, setIsGetTasks] = useState(false);
    const [isCompleteSprint, setIsCompleteSprint] = useState(false);
    const [isCreateSprint, setIsCreateSprint] = useState(false);
    const [isUpdateSprint, setIsUpdateSprint] = useState(false);
    const [isModalSprintOpen, setIsModalSprintOpen] = useState(false);
    const [isModalCreateSprintOpen, setIsModalCreateSprintOpen] = useState(false);
    const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] = useState(false);

    const [record, setRecord] = useState(null);
    const [nameSearch, setNameSearch] = useState('');
    const [usersSelect, setUsersSelect] = useState([]);
    const [_categories, setCategories] = useState([])
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [formUpdateSprint] = Form.useForm();
    const [formTask] = Form.useForm();

    const [isScrolled, setIsScrolled] = useState(false);

    const currentKey = useSelector(state => state.App?.current);
    const me = useSelector(state => state.main.entities.auth.user) || {};
    const users = useSelector(state => state.main.entities.user.users) || [];
    const currentProject = useSelector(state => state.main.entities.project?.currentProject) || {};
    const { active_sprints = [] } = currentProject || {};
    const tasks = useSelector(state => state.main.entities.task.tasks) || {};
    const categories = tasks[active_sprints[0]?.id] || [];

    const itemsBreadcrumb = [
        {
            title: isGetProject ? <Skeleton.Button active={true} size={"small"} /> : 'Projects',
            path: '/home'
        },
        {
            title: isGetProject ? <Skeleton.Button active={true} size={"small"} /> : currentProject?.name,
            path: `/project/${currentProject?.id}`
        },
    ];

    useEffect(() => {
        const getTasksFetch = async () => {
            setIsGetTasks(true);
            const res = await dispatch(getTasks(active_sprints[0].id));
            if (res.status === 200) {
                const { tasks_by_status } = res.data;
                setCategories(tasks_by_status);
            } else {
                createNotification('error', 'Get tasks error!')
            }
            setIsGetTasks(false);
        }
        if (active_sprints.length) {
            getTasksFetch();
        }
    }, [active_sprints])

    useEffect(() => {
        setCategories(categories);
    }, [categories])

    useEffect(() => {
        const fetchProject = async () => {
            setIsGetProject(true);
            const res = await dispatch(getProject(projectId));
            if (res.status !== 200) {
                createNotification('error', 'Have an error');
            }
            setIsGetProject(false);
        }
        fetchProject();
    }, [projectId])

    useEffect(() => {
        const tasksContainer = document.querySelector('.TasksWrapper');
        if (tasksContainer) {
            const handleScroll = () => {
                setIsScrolled(tasksContainer.scrollTop > 0);
            };

            tasksContainer.addEventListener('scroll', handleScroll);
            return () => {
                tasksContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const handleChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onSelect = (item) => {
        if (usersSelect.includes(item.id)) {
            const newArr = usersSelect.filter((i, index) => i !== item.id)
            setUsersSelect(newArr)
        } else {
            setUsersSelect(prev => ([...usersSelect, item.id]))
        }
    }

    const onChangeSearch = (e) => {
        setNameSearch(e.target.value);
    }

    const onClickSettingSprint = ({ item, key }) => {
        if (key === 'edit_sprint') {
            formUpdateSprint.setFieldsValue({
                sprintName: active_sprints[0].name,
                startDate: dayjs(active_sprints[0].start_date, 'YYYY-MM-DD'),
                endDate: dayjs(active_sprints[0].end_date, 'YYYY-MM-DD'),
            });
            setIsModalSprintOpen(true)
        }
    }

    const onCreateSprint = async (values) => {
        setIsCreateSprint(true);
        const { endDate, startDate } = values;
        const endDateString = dayjs(endDate).format('YYYY-MM-DD HH:mm:ss');
        const startDateString = dayjs(startDate).format('YYYY-MM-DD HH:mm:ss');
        const res = await dispatch(createSprint({
            id_project: projectId,
            end_date: endDateString,
            start_date: startDateString
        }))
        if (res.status === 201 || res.status === 200) {
            form.resetFields();
            createNotification('success', isModalCreateSprintOpen ? 'Create sprint success!' : 'Update sprint success');
            setIsCreateSprint(false);
            setIsModalCreateSprintOpen(false);
        } else {
            createNotification('error', isModalCreateSprintOpen ? 'Create sprint fail!' : 'Update sprint fail');
            setIsCreateSprint(false);
        }
        form.resetFields();
    }

    const onuUpdateSprint = async (values) => {
        setIsUpdateSprint(true);
        const { endDate, startDate, sprintName } = values;
        const endDateString = dayjs(endDate).format('YYYY-MM-DD HH:mm:ss');
        const startDateString = dayjs(startDate).format('YYYY-MM-DD HH:mm:ss');
        const res = await dispatch(updateSprint(
            active_sprints[0]?.id,
            {
                name: sprintName,
                end_date: endDateString,
                start_date: startDateString
            }
        ))
        if (res.status === 201 || res.status === 200) {
            formUpdateSprint.resetFields();
            createNotification('success', 'Update sprint success');
            setIsUpdateSprint(false);
            setIsModalSprintOpen(false);
        } else {
            createNotification('error', 'Update sprint fail');
            setIsUpdateSprint(false);
        }
    }

    const onCreateTask = async (values) => {
        setIsCreateTask(true);
        const { expriedDate, assignee, description, name, priority, upload } = values;
        const listFileOri = upload && upload.map(item => item.originFileObj);
        const data = {
            id_status: record,
            id_assignee: assignee,
            id_reporter: me.id,
            id_sprint: active_sprints[0].id,
            name,
            priority,
            description,
            expired_at: dayjs(expriedDate).format('YYYY-MM-DD'),
            files: listFileOri,
        }
        const res = await dispatch(createTask(data));
        if (res.status === 201 || res.status === 200) {
            createNotification('success', 'Create task success!')
            setIsModalCreateTaskOpen(false);
            formTask.resetFields();
        } else {
            createNotification('error', 'Create task error!')
        }
        setIsCreateTask(false);
    }

    const handleCancel = () => {
        if (isModalSprintOpen) {
            setIsModalSprintOpen(false);
            formUpdateSprint.resetFields();
        }
        if (isModalCreateSprintOpen) {
            setIsModalCreateSprintOpen(false);
            form.resetFields();
        }
        if (isModalCreateTaskOpen) {
            setIsModalCreateTaskOpen(false);
            setFileList([])
            formTask.resetFields();
        }
    }

    const renderContentModalSprint = () => {
        return (
            <FormEditSprint
                form={formUpdateSprint}
                onFinish={onuUpdateSprint}
                labelAlign={'left'}
                labelCol={{
                    flex: '110px'
                }}
                initialValues={isModalSprintOpen ? {
                    sprintName: active_sprints[0].name,
                    startDate: dayjs(active_sprints[0].start_date, 'YYYY-MM-DD'),
                    endDate: dayjs(active_sprints[0].end_date, 'YYYY-MM-DD'),
                } : {}}
            >
                <Form.Item>
                    <p className={'note'}>Required fields are marked with an asterisk <span>*</span></p>
                </Form.Item>
                <Form.Item
                    label={'Sprint name'}
                    name='sprintName'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Sprint name'} />
                </Form.Item>
                <Form.Item
                    required={true}
                    name='startDate'
                    label="Start date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    required={true}
                    name='endDate'
                    label="End date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isUpdateSprint} type="primary" htmlType="submit">
                            Update
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormEditSprint>
        )
    }

    const renderContentModalCreateSprint = () => {
        return (
            <FormEditSprint
                form={form}
                onFinish={onCreateSprint}
                labelAlign={'left'}
                labelCol={{
                    flex: '110px'
                }}
            >
                <Form.Item>
                    <p className={'note'}>Required fields are marked with an asterisk <span>*</span></p>
                </Form.Item>
                <Form.Item
                    required={true}
                    name='startDate'
                    label="Start date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    required={true}
                    name='endDate'
                    label="End date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isCreateSprint} type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormEditSprint>
        )
    }

    const renderContentModalCreateTask = () => {
        return (
            <FormCreateTask
                form={formTask}
                labelAlign={'left'}
                labelCol={{
                    flex: '110px'
                }}
                onFinish={onCreateTask}
                initialValues={{
                    assignee: users[0]?.id,
                    priority: 'medium'
                }}
            >
                <Form.Item>
                    <p className={'note'}>Required fields are marked with an asterisk <span>*</span></p>
                </Form.Item>
                <Form.Item
                    label={'Task name'}
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Task name'} />
                </Form.Item>
                <Form.Item
                    label={'Description'}
                    name='description'
                >
                    {/*<CKEditorCustom />*/}
                    <Input.TextArea placeholder={'Task name'} />
                </Form.Item>
                <Form.Item
                    label="Assignee"
                    name="assignee"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select defaultValue={users[0]?.id} style={{ height: 40 }} suffixIcon={false} showSearch={true}>
                        {users.map(item => {
                            return (
                                <Option value={item.id} key={item?.id}>
                                    <SelectOptionItem>
                                        <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} />
                                        <p>{item?.user_name}</p>
                                    </SelectOptionItem>
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    required={true}
                    name='expriedDate'
                    label="Expried date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item
                    name='priority'
                    label="Priority"
                >
                    <Select defaultValue={'medium'} options={priorityOption} />
                </Form.Item>
                <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        accept='.jpg,.png,.jpeg'
                        multiple={true}
                        name="attachment"
                        listType="picture-card"
                        className={'uploadWrapper'}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleChangeUpload}
                        showUploadList={{ showPreviewIcon: false }}
                        showPreview={false}
                    >
                        <UploadAreaWrapper>
                            <MdUpload fontSize={20} color={'#637381'} /> Attachments
                        </UploadAreaWrapper>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isCreateTask} type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormCreateTask>
        )
    }

    const onClickCreateTask = () => {
        setIsModalCreateTaskOpen(true);
    }

    const onClickCreateSprint = () => {
        setIsModalCreateSprintOpen(true);
    }

    const onDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceCategory = categories.find(cat => cat.id === source.droppableId);
        const destCategory = categories.find(cat => cat.id === destination.droppableId);

        if (sourceCategory && destCategory) {
            const sourceTasks = Array.from(sourceCategory.tasks);
            const destTasks = Array.from(destCategory.tasks);

            const [movedTask] = sourceTasks.splice(source.index, 1);

            if (source.droppableId === destination.droppableId) {
                sourceTasks.splice(destination.index, 0, movedTask);
                setCategories(categories.map(cat =>
                    cat.id === sourceCategory.id
                        ? { ...cat, tasks: sourceTasks.map((task, index) => ({ ...task, index })) }
                        : cat
                ));
            } else {
                destTasks.splice(destination.index, 0, movedTask);
                setCategories(categories.map(cat =>
                    cat.id === sourceCategory.id
                        ? { ...cat, tasks: sourceTasks.map((task, index) => ({ ...task, index })) }
                        : cat.id === destCategory.id
                            ? { ...cat, tasks: destTasks.map((task, index) => ({ ...task, index })) }
                            : cat
                ));
            }
            const res = await dispatch(updateOrderTask({
                taskId: movedTask.id,
                id_status: movedTask.id_status,
                id_sprint: movedTask.id_sprint,
                sourceIndex: source.index,
                destIndex: destination.index,
                destinationStatus: destination.droppableId,
            }));
            if (res.status !== 200) {
                setCategories(categories);
                setUsersSelect([]);
                createNotification('error', 'Change status fail!');
            }
        }
    };

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    const onComfirmComplete = async () => {
        setIsCompleteSprint(true);
        const res = await dispatch(completeSprint(active_sprints[0].id, {is_close: true}));
        if (res.status === 200) {
            createNotification('success', 'Completed sprint success!');
        } else {
            createNotification('error', 'Completed sprint fail!');
        }
        setIsCompleteSprint(false);
    }

    return (
        currentKey === 'board' ? (
            <>
                <ProjectDetailWrapper>
                    <Breadcrumb>
                        {itemsBreadcrumb.map(item => {
                            return (
                                <Breadcrumb.Item onClick={() => onClickBreadcrumb(item.path)}>{item.title}</Breadcrumb.Item>
                            )
                        })}
                    </Breadcrumb>
                    {(!isGetProject && !active_sprints?.length) ? (
                        <EmptySprintWrapper>
                            <h1>Empty sprint active</h1>
                            <p>Create a sprint to start work</p>
                            <Button type={"primary"} onClick={onClickCreateSprint}>Create sprint</Button>
                        </EmptySprintWrapper>
                    ) : (
                        <>
                            <div className={'sprintHeader'}>
                                {isGetProject ? (
                                    <Skeleton.Button active={true} size={40} />
                                ) : (
                                    <h1>{currentProject.key} {active_sprints[0]?.name}</h1>
                                )}
                                <div className={'sprintOption'}>
                                    {isGetProject ? (
                                        <Skeleton.Button active={true} size={"small"} />
                                    ) : (
                                        <p>End time: {moment(active_sprints[0]?.end_date).format('DD/MM/YYYY')}</p>
                                    )}
                                    <Popconfirm title={'Do you want to complete this sprint?'} onConfirm={onComfirmComplete}>
                                        <Button disabled={isGetProject} loading={isCompleteSprint} type={"primary"}>Complete sprint</Button>
                                    </Popconfirm>
                                    <Dropdown
                                        menu={{
                                            items,
                                            onClick: onClickSettingSprint
                                        }}
                                        arrow={false}
                                        placement="bottomLeft"
                                        trigger={'click'}
                                        getPopupContainer={triggerNode => triggerNode}
                                    >
                                        <Button><SlOptions color={'#637381'} fontSize={20} /></Button>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={'searchAndFilterNav'}>
                                <Input
                                    value={nameSearch}
                                    onChange={onChangeSearch}
                                    placeholder="Search"
                                    prefix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                                />
                                <div className={'listUser'}>
                                    {users.map((item, index) => {
                                        return (
                                            <UserItem key={`user-${index}`} is_select={usersSelect.includes(item.id) || undefined} onClick={() => onSelect(item)} className={'userItem'}>
                                                <AvatarCustom size={32} name={item?.user_name} src={item?.avatar} />
                                            </UserItem>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={'TasksWrapper'}>
                                {isGetTasks ? (
                                    <StatusesWrapperLoading>
                                        {[1, 2, 3, 4].map(item => {
                                            return (
                                                <StatusWrapperLoading>
                                                    <Skeleton.Button active={true} />
                                                </StatusWrapperLoading>
                                            )
                                        })}
                                    </StatusesWrapperLoading>

                                ) : (
                                    <>
                                        <StatusesTask isScrolled={isScrolled} />
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <div className={'tasksContainer'}>
                                                {_categories.map((item, index) => {
                                                    return <Tasks
                                                        tasks={item.tasks}
                                                        id={item.id}
                                                        key={item.id}
                                                        nameSearch={nameSearch}
                                                        usersSelect={usersSelect}
                                                        setRecord={setRecord}
                                                        onClickCreateTask={onClickCreateTask}
                                                    />
                                                })}
                                            </div>
                                        </DragDropContext>
                                    </>
                                )}

                            </div>
                        </>
                    )}


                </ProjectDetailWrapper>
                <Modal
                    title={"Edit sprint"}
                    wrapClassName={'modalAddProject'}
                    open={isModalSprintOpen}
                    onCancel={handleCancel}
                    footer={false}
                    getContainer={triggerNode => triggerNode}
                >
                    {renderContentModalSprint()}
                </Modal>
                <Modal
                    title={"Create sprint"}
                    wrapClassName={'modalAddProject'}
                    open={isModalCreateSprintOpen}
                    onCancel={handleCancel}
                    footer={false}
                    getContainer={triggerNode => triggerNode}
                >
                    {renderContentModalCreateSprint()}
                </Modal>
                <Modal
                    title="Create task"
                    wrapClassName={'modalAddTaskmy'}
                    open={isModalCreateTaskOpen}
                    onCancel={handleCancel}
                    footer={false}
                    getContainer={triggerNode => triggerNode}
                >
                    {renderContentModalCreateTask()}
                </Modal>
            </>

        ) : (
            <Issues isGetProject={isGetProject} />
        )
    );
}

export default React.memo(Project);