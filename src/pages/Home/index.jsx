import React, {useEffect, useState} from 'react';
import {Button, Input, Select, Space, Table, Dropdown, Modal, Form, Upload, Menu, Popover, Popconfirm} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineSearch, MdKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaRegStar  } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { useDebounce } from 'use-debounce';
import actions from "../../redux/app/actions.js";

const { changeCurrent } = actions;
// Styles
import {HomeWrapper, MoreOption, FormWrapper, OpionSelectUser, ProjectName, BoxStar} from './local.styles';
import { ContentLayoutWrapper } from "../../components/MainLayout/local.styles.js";
import {useHistory} from "react-router-dom";
import AvatarCustom from "../../components/AvatarCustom";
import {useDispatch, useSelector} from "react-redux";
import {createProject, deleteProject, getProjects, updateProject} from "../../redux/main/actions/project.js";
import createNotification from "../../utils/notificationHelper.js";

const { Option } = Select;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();

    const me = useSelector(state => state.main.entities.auth.user) || {};
    const users = useSelector(state => state.main.entities.user.users) || [];
    const projects = useSelector(state => state.main.entities.project?.projects?.data) || [];
    const projectTypes = useSelector(state => state.main.entities.project_type?.project_types?.data) || [];

    const [recordOption, setRecordOption] = useState(null);
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isUpdateProject, setIsUpdateProject] = useState(false);
    const [isGetProjects, setIsGetProjects] = useState(true);
    const [open, setOpen] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const [query, setQuery] = useState({ search: '' });
    const [debouncedQuery] = useDebounce(query, 500);

    useEffect(() => {
        const fetchGetProjects = async () => {
            setIsGetProjects(true);
            const res = await dispatch(getProjects(1, 100, debouncedQuery.search));
            if (res?.status === 200 || res === undefined) {
                // setIsGetProjects(false);
            } else {
                createNotification('error', 'Get projects error');
            }
            setIsGetProjects(false);
        }
        fetchGetProjects();
    }, [debouncedQuery])

    const onChangeFavorite = (e, record) => {
        e.stopPropagation();
        const dataRes = {
            id: record.id,
            is_favorite: !record.is_favorite,
        }
        dispatch(updateProject(dataRes))
    }

    const handleChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onLeadChange = (value) => {
        form.setFieldsValue({
            lead: value,
        });
    };

    const onTypeChange = (value) => {
        form.setFieldsValue({
            id_type: value,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalUpdate = () => {
        setOpenModalUpdate(true);
    };
    const handleOk = async (values) => {
        setIsCreateProject(true);
        const { description, icon, lead, id_type, name, projectKey } = values;
        const res = await dispatch(createProject({
            id_type,
            id_lead: lead,
            name,
            key: projectKey,
            icon: fileList[0]?.originFileObj || null,
            description
        }))
        if (res.status === 201 || res.status === 200) {
            createNotification('success', 'Create project success!');
            setIsCreateProject(false)
            setIsModalOpen(false);
            setFileList([])
            form.resetFields();
        } else {
            createNotification('error', 'Create project error!');
            setIsCreateProject(false)
            setIsModalOpen(false);
        }
    };

    const handleOkUpdate = async (values) => {
        setIsUpdateProject(true);
        const { description, icon, lead, id_type, name, projectKey } = values;
        const res = await dispatch(updateProject({
            id: recordOption.id,
            id_type,
            id_lead: lead,
            name,
            key: projectKey,
            icon: fileList[0]?.originFileObj || null,
            description
        }))
        if (res.status === 201 || res.status === 200) {
            createNotification('success', 'Update project success!');
            setIsUpdateProject(false);
            setOpenModalUpdate(false)
            setFileList([])
            formUpdate.resetFields();
        } else {
            createNotification('error', 'Update project error!');
            setIsUpdateProject(false)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsCreateProject(false)
        setFileList([])
        form.resetFields();
    };

    const handleCancelUpdate = () => {
        setOpenModalUpdate(false);
        setFileList([])
        // formUpdate.resetFields();
    };

    const renderContentModalUpdate = () => {
        return (
            <FormWrapper
                form={formUpdate}
                onFinish={handleOkUpdate}
            >
                <Form.Item name='icon' valuePropName="icon" getValueFromEvent={normFile}>
                    <Upload
                        accept='.jpg,.png,.jpeg'
                        listType="picture-card"
                        showUploadList={{
                            showPreviewIcon: false,
                        }}
                        maxCount={1}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleChangeUpload}
                    >
                        {fileList.length ? null : (
                            <AvatarCustom type={'square'} size={90} name={recordOption?.name} src={recordOption?.icon} />
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Project name'} />
                </Form.Item>
                <Form.Item
                    name='projectKey'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Project key'} />
                </Form.Item>
                <Form.Item
                    name="id_type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch={true}
                        defaultValue={projectTypes[0]?.id}
                        placeholder="Select a type"
                        onChange={onTypeChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        {projectTypes.map((item, index) => {
                            return (
                                <Option value={item?.id} key={item?.id}>
                                    {item.name}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name='description'>
                    <Input.TextArea placeholder={'Description'} />
                </Form.Item>
                <Form.Item
                    name="lead"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch={true}
                        defaultValue={users[0]?.id}
                        placeholder="Select a lead"
                        onChange={onLeadChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        {users.map((item, index) => {
                            return (
                                <Option value={item?.id} key={item?.id}>
                                    <OpionSelectUser>
                                        <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} />
                                        <p>{item?.user_name}</p>
                                    </OpionSelectUser>
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isUpdateProject} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button htmlType="button" onClick={handleCancelUpdate}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormWrapper>
        )
    }

    const renderContentModal = () => {
        return (
            <FormWrapper
                form={form}
                onFinish={handleOk}
                initialValues={{
                    lead: users[0]?.id,
                    id_type: projectTypes[0]?.id,
                }}
            >
                <Form.Item name='icon' valuePropName="icon" getValueFromEvent={normFile}>
                    <Upload
                        accept='.jpg,.png,.jpeg'
                        listType="picture-card"
                        showUploadList={{
                            showPreviewIcon: false,
                        }}
                        maxCount={1}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleChangeUpload}
                    >
                        {fileList.length >= 1 ? null : (
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Icon
                                </div>
                            </button>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Project name'} />
                </Form.Item>
                <Form.Item
                    name='projectKey'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Project key'} />
                </Form.Item>
                <Form.Item
                    name="id_type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch={true}
                        defaultValue={projectTypes[0]?.id}
                        placeholder="Select a type"
                        onChange={onTypeChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        {projectTypes.map((item, index) => {
                            return (
                                <Option value={item?.id} key={item?.id}>
                                    {item.name}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name='description'>
                    <Input.TextArea placeholder={'Description'} />
                </Form.Item>
                <Form.Item
                    name="lead"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch={true}
                        defaultValue={users[0]?.id}
                        placeholder="Select a lead"
                        onChange={onLeadChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        {users.map((item, index) => {
                            return (
                                <Option value={item?.id} key={item?.id}>
                                    <OpionSelectUser>
                                        <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} />
                                        <p>{item?.user_name}</p>
                                    </OpionSelectUser>
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button disabled={me.role === 'employee'} loading={isCreateProject} type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormWrapper>
        )
    }

    const onRowTable = (record, index) => {
        dispatch(changeCurrent('board'));
        history.push(`/project/${record.id}`);
    }

    const onClick = async (_record, event) => {
        setRecordOption(_record);
        if (event.key === 'project_setting') {
            formUpdate.setFieldsValue({
                name: _record?.name,
                id_type: _record?.id_type,
                description: _record?.description,
                lead: _record?.id_lead,
                projectKey: _record?.key,
            })
            showModalUpdate(true);
        }
    }

    const onConfirmDelete = async () => {
        const res = await dispatch(deleteProject([recordOption.id]))
        if (res.status === 200) {
            createNotification('success', 'Delete project successfully!')
        } else {
            createNotification('error', 'Delete project error!')
        }
    }

    const items = (isDisable) => {
        return(
            [
                {
                    key: 'project_setting',
                    label: <p>Project settings</p>,
                    disabled: isDisable
                },
                {
                    key: 'move_to_trash',
                    label: <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={onConfirmDelete}
                    ><p>Move to trash</p></Popconfirm>,
                    disabled: isDisable
                },
            ]
        )
    };

    const columns = [
        // {
        //     title: <FaStar fontSize={18} color={'#637381'} />,
        //     dataIndex: 'is_favorite',
        //     key: 'is_favorite',
        //     width: 60,
        //     render: (_, record) => {
        //         const { is_favorite } = record;
        //         return (
        //             <BoxStar onClick={(e) => onChangeFavorite(e, record)}>
        //                 {is_favorite ? <FaStar fontSize={20} color={'#637381'} /> : <FaRegStar fontSize={20} color={'#637381'} />}
        //             </BoxStar>
        //         )
        //     },
        //     sorter: (a, b) => a.is_favorite - b.is_favorite,
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                const { icon, name } = record;
                return (
                    <ProjectName>
                        <AvatarCustom size={24} type={'square'} name={name} src={icon}/>
                        <p>{record.name}</p>
                    </ProjectName>
                )
            },
            sorter: (a, b) => a.name.localeCompare(b.name),

        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => <p>{record.key}</p>,
            sorter: (a, b) => a.key.localeCompare(b.key),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => <p>{record.project_type_name}</p>,
            sorter: (a, b) => a.project_type_name.localeCompare(b.project_type_name),
        },
        {
            title: 'Lead',
            dataIndex: 'lead',
            key: 'lead',
            render: (_, record) => {
                if (!record.user_name) return null
                return (
                    <ProjectName>
                        <AvatarCustom size={24} src={record.user_avatar} name={record.user_name} />
                        <p>{record.user_name}</p>
                    </ProjectName>
                )
            },
            sorter: (a, b) => a.user_name.localeCompare(b.user_name),
        },
        {
            title: 'More actions',
            dataIndex: 'lead',
            key: 'lead',
            width: 150,
            align: 'right',
            render: (_, record) => {
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Popover
                            content={<Menu items={items(!(me.role === 'admin' || me.role === 'manager' || me.id === record.id_type))} onClick={(e) => {
                                onClick(record, e)
                            }} selectedKeys={[]}/>}
                            arrow={false}
                            trigger='hover'
                            placement={'bottomLeft'}
                            title={false}
                            key={record.id}
                            getPopupContainer={triggerNode => triggerNode}
                            onOpenChange={() => setOpen(!open)}
                        >
                            <MoreOption>
                                <SlOptions
                                    fontSize={20}
                                    color={'#637381'}
                                />
                            </MoreOption>
                        </Popover>
                    </div>
                )
            },
        },
    ];

    const onChangeSearch = (e) => {
        setQuery({search: e.target.value});
    }

    return (
        <>
            <ContentLayoutWrapper>
                <HomeWrapper>
                    <div className={'headerWrapper'}>
                        <h1>Projects</h1>
                        <Button disabled={me.role === 'employee'} onClick={showModal} type={"primary"}>Create project</Button>
                    </div>
                    <div className={'searchsWrapper'}>
                        <Input
                            value={query.search}
                            placeholder="Search projects"
                            suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                            onChange={onChangeSearch}
                        />
                    </div>
                    <Table
                        loading={isGetProjects && projects}
                        size={"small"}
                        columns={columns}
                        dataSource={projects}
                        onRow={(record, index) => {
                            return {
                                onClick: () => onRowTable(record, index)
                            }
                        }}
                        showSorterTooltip={{
                            target: 'sorter-icon',
                        }}
                    />
                </HomeWrapper>
            </ContentLayoutWrapper>
            <Modal
                title="Create project"
                wrapClassName={'modalAddProject'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModal()}
            </Modal>
            <Modal
                title={"Update project"}
                wrapClassName={'modalAddProject'}
                open={openModalUpdate}
                onCancel={handleCancelUpdate}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModalUpdate()}
            </Modal>
        </>
    );
}

export default React.memo(Home);