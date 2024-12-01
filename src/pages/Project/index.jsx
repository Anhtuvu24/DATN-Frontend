import React, { useState } from 'react';
import {Avatar, Breadcrumb, Button, Input, Dropdown, Modal, Form, Space, DatePicker} from "antd";
import { SlOptions } from "react-icons/sl";
import { MdOutlineSearch } from "react-icons/md";
import { DragDropContext } from 'react-beautiful-dnd';

// Styles
import {FormEditSprint, ProjectDetailWrapper, UserItem} from './local.styles.js';
import StatusesTask from "./StatusesTask";
import Tasks from "./Tasks";

const users = ['V', 'A', 'T'];

const items = [
    {
        key: 'edit_sprint',
        label: <p>Edit sprint</p>,
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

function Project() {
    const [isModalSprintOpen, setIsModalSprintOpen] = useState(false);
    const [usersSelect, setUsersSelect] = useState([]);
    const [categories, setCategories] = useState(initData)
    const [form] = Form.useForm();

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
        setIsModalSprintOpen(false)
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

    const onDragEnd = (result) => {
        debugger
    }

    return (
        <>
            <ProjectDetailWrapper>
                <Breadcrumb>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>Softwate Development</Breadcrumb.Item>
                </Breadcrumb>
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
                        {users.map(item => {
                            return (
                                <UserItem is_select={usersSelect.includes(item) || undefined} onClick={() => onSelect(item)} className={'userItem'}>
                                    <Avatar size={32}>{item}</Avatar>
                                </UserItem>
                            )
                        })}
                    </div>
                </div>
                <div className={'TasksWrapper'}>
                    <StatusesTask categories={categories} />
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={'tasksWrapper'}>
                            {categories.map((item, index) => {
                                return <Tasks tasks={item.tasks} id={item.id} key={item.id} />
                            })}
                        </div>
                    </DragDropContext>
                </div>
            </ProjectDetailWrapper>
            <Modal
                title="Create project"
                wrapClassName={'modalAddProject'}
                open={isModalSprintOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModalSprint()}
            </Modal>
        </>
    );
}

export default React.memo(Project);