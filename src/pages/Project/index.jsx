import React, { useState, useEffect } from 'react';
import { Avatar, Breadcrumb, Button, Input, Dropdown, Modal, Form, Space, DatePicker, Select, Upload } from "antd";
import { SlOptions } from "react-icons/sl";
import { MdOutlineSearch, MdUpload } from "react-icons/md";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment";

// Components
import CKEditorCustom from "../../components/CKEditor/index.jsx";

// Styles
import {
    EmptySprintWrapper,
    FormCreateTask,
    FormEditSprint, ListFileWrapper,
    ProjectDetailWrapper,
    SelectOptionItem,
    UploadAreaWrapper,
    UserItem
} from './local.styles.js';
import StatusesTask from "./StatusesTask";
import Tasks from "./Tasks";
import FileComp from "../../components/FileComp";
import {useHistory} from "react-router-dom";

const users = ['V', 'A', 'T'];

const items = [
    {
        key: 'edit_sprint',
        label: <p>Edit sprint</p>,
    },
];

const itemsBreadcrumb = [
    {
        title: 'Projects',
        path: '/home'
    },
    {
        title: 'Software Development',
        path: '/project/1'
    },
];

const initData = [
    {
        id: 'category-1',
        title: 'to-do',
        tasks: [
            {
                id: `task-1.1`,
                title: 'Test 1.1',
            },
            {
                id: `task-1.2`,
                title: 'Test 1.2',
            },
            {
                id: `task-1.3`,
                title: 'Test 1.3',
            },
        ],
    },
    {
        id: 'category-2',
        title: 'inprogess',
        tasks: [
            {
                id: `task-2.1`,
                title: 'Test 2.1',
            },
            {
                id: `task-2.2`,
                title: 'Test 2.2',
            },
            {
                id: `task-2.3`,
                title: 'Test 3.3',
            },
        ],
    },
    {
        id: 'category-3',
        title: 'ready for test',
        tasks: [
            {
                id: `task-3.1`,
                title: 'Test 3.1',
            },
            {
                id: `task-3.2`,
                title: 'Test 3.2',
            },
            {
                id: `task-3.3`,
                title: 'Test 3.3',
            },
        ],
    },
    {
        id: 'category-4',
        title: 'Done',
        tasks: [
            {
                id: `task-4.1`,
                title: 'Test 4.1',
            },
            {
                id: `task-4.2`,
                title: 'Test 4.2',
            },
            {
                id: `task-4.3`,
                title: 'Test 4.3',
            },
        ],
    }
]

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
        value: 'High',
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
    const history = useHistory();
    const [isModalSprintOpen, setIsModalSprintOpen] = useState(false);
    const [isModalCreateSprintOpen, setIsModalCreateSprintOpen] = useState(false);
    const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] = useState(false);
    const [record, setRecord] = useState(null);
    const [usersSelect, setUsersSelect] = useState([]);
    const [categories, setCategories] = useState(initData)
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const [isScrolled, setIsScrolled] = useState(false);

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
        if (usersSelect.includes(item)) {
            const newArr = usersSelect.filter((i, index) => i !== item)
            setUsersSelect(newArr)
        } else {
            setUsersSelect(prev => ([...usersSelect, item]))
        }
    }

    const onClickSettingSprint = ({ item, key }) => {
        if (key === 'edit_sprint') {
            setIsModalSprintOpen(true)
        }
    }

    const handleCancel = () => {
        if (isModalSprintOpen) {
            setIsModalSprintOpen(false);
        }
        if (isModalCreateSprintOpen) {
            setIsModalCreateSprintOpen(false);
        }
        if (isModalCreateTaskOpen) {
            setIsModalCreateTaskOpen(false);
            setFileList([])
        }
        form.resetFields();
    }

    const renderContentModalSprint = () => {
        return (
            <FormEditSprint
                form={form}
                labelAlign={'left'}
                labelCol={{
                    flex: '110px'
                }}
            >
                <Form.Item>
                    <p className={'note'}>Required fields are marked with an asterisk <span>*</span></p>
                </Form.Item>
                {isModalSprintOpen && (
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
                )}
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
                    <DatePicker showTime />
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
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
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

    const renderContentModalCreateTask = () => {
        return (
            <FormCreateTask
                form={form}
                labelAlign={'left'}
                labelCol={{
                    flex: '110px'
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
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Select style={{ height: 40 }} suffixIcon={false} showSearch={true}>
                        <Option value="apple">
                            <SelectOptionItem>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/datn-1af41.firebasestorage.app/o/avatars%2F1732561620989-default-user.png?alt=media&token=eef741cb-385c-4d42-91cc-1d5eecf9ab74"
                                    alt="apple"
                                    style={{ marginRight: 8 }}
                                    width={24}
                                />
                                Apple
                            </SelectOptionItem>
                        </Option>
                        <Option value="banana">
                            <SelectOptionItem>
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="banana"
                                    style={{ marginRight: 8 }}
                                    width={24}
                                />
                                Banana
                            </SelectOptionItem>
                        </Option>
                        <Option value="cherry">
                            <SelectOptionItem>
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="cherry"
                                    style={{ marginRight: 8 }}
                                    width={24}
                                />
                                Cherry
                            </SelectOptionItem>
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    required={true}
                    name='Expried date'
                    label="expriedDate"
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
                        listType="picture"
                        className={'uploadWrapper'}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleChangeUpload}
                        showUploadList={false}
                    >
                        {fileList.length ? (
                            <ListFileWrapper>
                                {fileList.map((item, index) => {
                                    return (
                                        <FileComp file={item} size={'100px'} />
                                    )
                                })}
                            </ListFileWrapper>
                        ) : (
                            <UploadAreaWrapper>
                                <MdUpload fontSize={20} color={'#637381'} /> Attachments
                            </UploadAreaWrapper>

                        )}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
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

    const onDragEnd = (result) => {
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
                        ? { ...cat, tasks: sourceTasks }
                        : cat
                ));
            } else {
                destTasks.splice(destination.index, 0, movedTask);
                setCategories(categories.map(cat =>
                    cat.id === sourceCategory.id
                        ? { ...cat, tasks: sourceTasks }
                        : cat.id === destCategory.id
                            ? { ...cat, tasks: destTasks }
                            : cat
                ));
            }
        }
    };

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    return (
        <>
            <ProjectDetailWrapper>
                <Breadcrumb>
                    {itemsBreadcrumb.map(item => {
                        return (
                            <Breadcrumb.Item onClick={() => onClickBreadcrumb(item.path)}>{item.title}</Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
                {true ? (
                    <EmptySprintWrapper>
                        <h1>Empty sprint</h1>
                        <p>Create a sprint to start work</p>
                        <Button type={"primary"} onClick={onClickCreateSprint}>Create sprint</Button>
                    </EmptySprintWrapper>
                ) : (
                    <>
                        <div className={'sprintHeader'}>
                            <h1>SD Sprint 10</h1>
                            <div className={'sprintOption'}>
                                <p>Kết thúc vào 22/12/2024</p>
                                <Button type={"primary"}>Complete sprint</Button>
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
                            <Input placeholder="Search" prefix={<MdOutlineSearch fontSize={20} color={'#637381'} />}/>
                            <div className={'listUser'}>
                                {users.map((item, index) => {
                                    return (
                                        <UserItem key={`user-${index}`} is_select={usersSelect.includes(item) || undefined} onClick={() => onSelect(item)} className={'userItem'}>
                                            <Avatar size={32}>{item}</Avatar>
                                        </UserItem>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={'TasksWrapper'}>
                            <StatusesTask isScrolled={isScrolled} categories={categories} />
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className={'tasksContainer'}>
                                    {categories.map((item, index) => {
                                        return <Tasks
                                            tasks={item.tasks}
                                            id={item.id}
                                            key={item.id}
                                            setRecord={setRecord}
                                            onClickCreateTask={onClickCreateTask}
                                        />
                                    })}
                                </div>
                            </DragDropContext>
                        </div>
                    </>
                )}


            </ProjectDetailWrapper>
            <Modal
                title={isModalCreateSprintOpen ? "Create sprint" : "Edit sprint"}
                wrapClassName={'modalAddProject'}
                open={isModalSprintOpen || isModalCreateSprintOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModalSprint()}
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
    );
}

export default React.memo(Project);