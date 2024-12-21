import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Button, Form, Input, Menu, Modal, Popconfirm, Popover, Select, Space, Table} from "antd";
import {SlOptions} from "react-icons/sl";
import {MdKeyboardArrowDown, MdOutlineSearch} from "react-icons/md";
import {useHistory} from "react-router-dom";
import dayjs from "dayjs";

// Styles
import {ContentLayoutWrapper} from "../../components/MainLayout/local.styles.js";
import {AccountsManagerWrapper, FormWrapper, MoreOption} from "../AccountManager/local.styles.js";
import {
    addProjectType,
    deleteProjectType,
    getProjectTypes,
    updateProjectType
} from "../../redux/main/actions/project_type.js";
import createNotification from "../../utils/notificationHelper.js";

const itemsBreadcrumb = [
    {
        title: 'Projects',
        path: '/home'
    },
    {
        title: 'Project type',
        path: '/admin/project-types'
    },
];

function ProjectTypeManager() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isGetProjectTypeLoading, setIsGetProjectTypeLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [record, setRecord] = useState(null);
    const [searchName, setSearchName] = useState('');

    const projectTypes = useSelector(state => state.main.entities.project_type?.project_types?.data) || [];
    const [_projectTypes, setProjectTypes] = useState(projectTypes || []);

    const [form] = Form.useForm();
    const [formEdit] = Form.useForm();

    useEffect(() => {
        setProjectTypes(projectTypes);
    }, [projectTypes])

    useEffect(() => {
        const fetchProjectTypes = async () => {
            setIsGetProjectTypeLoading(true);
            const res = await dispatch(getProjectTypes(1, 100));
            if (res.status !== 200) {
                createNotification('error', 'An error occurred');
            }
        }
        fetchProjectTypes();
        setIsGetProjectTypeLoading(false)
    }, [])

    useEffect(() => {
        if (!searchName) {
            setProjectTypes(projectTypes);
        } else {
            const newProjectTypes = projectTypes.filter((item) => {
                const isSameNameOrGmail = item.name?.toLowerCase().includes(searchName.toLowerCase().trim());
                return isSameNameOrGmail
            })
            setProjectTypes(newProjectTypes)
        }
    }, [searchName])

    const onClick = async (_record, event) => {
        setRecord(_record)
        if (event.key === 'edit') {
            formEdit.setFieldsValue({
                name: _record.name
            });
            setIsModalUpdateOpen(true);
        }
    }

    const onConfirmDelete = () => {
        dispatch(deleteProjectType(record.id));
    }

    const items = [
        {
            key: 'edit',
            label: 'Edit'
        },
        {
            key: 'move_to_trash',
            label: <Popconfirm title={'Delete this project type?'} onConfirm={onConfirmDelete}>
                <p>Move to trash</p>
            </Popconfirm>,
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'name',
            render: (_, record) => <p>{dayjs(record.created_at).format('DD/MM/YYYY HH:mm:ss')}</p>,
            sorter: (a, b) => a.name.localeCompare(b.created_at),
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
                            content={<Menu items={items} onClick={(e) => {
                                onClick(record, e)
                            }} selectedKeys={[]}/>}
                            arrow={false}
                            trigger='hover'
                            placement={'bottomLeft'}
                            title={false}
                            key={record.id}
                            getPopupContainer={triggerNode => triggerNode}
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
    ]

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalUpdateOpen(false);
    }

    const changeSearchName = (e) => {
        const value = e.target.value;
        setSearchName(value);
    }

    const onHanleOk = async (values) => {
        setIsCreate(true);
        const { name } = values;
        const res = await dispatch(addProjectType({ name }));
        if (res.status !== 201) {
            createNotification('error', 'Create project fail');
        }
        setIsCreate(false);
    }

    const renderContentModal = () => {
        return (
            <FormWrapper form={form} onFinish={onHanleOk}>
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Name project type'} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isCreate} type="primary" htmlType="submit">
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

    const onOkEdit = async (values) => {
        setIsUpdate(true);
        const res = await dispatch(updateProjectType({id: record.id, name: values.name}));
        if (res.status !== 200) {
            createNotification('error', 'Update project fail');
        }
        setIsUpdate(false);
        setIsModalUpdateOpen(false);
    }

    const renderContentUpdateModal = () => {
        return (
            <FormWrapper form={formEdit} onFinish={onOkEdit}>
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'Name project type'} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isUpdate} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </FormWrapper>
        )
    }

    return (
        <>
            <ContentLayoutWrapper>
                <AccountsManagerWrapper>
                    <div className={'headerWrapper'}>
                        <Breadcrumb>
                            {itemsBreadcrumb.map(item => {
                                return (
                                    <Breadcrumb.Item onClick={() => onClickBreadcrumb(item.path)}>{item.title}</Breadcrumb.Item>
                                )
                            })}
                        </Breadcrumb>
                        <Button onClick={showModal} type={"primary"}>Create project type</Button>
                    </div>
                    <div className={'searchsWrapper'}>
                        <Input
                            value={searchName}
                            placeholder="Search users"
                            suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                            onChange={changeSearchName}
                        />
                    </div>
                    <Table
                        size={"small"}
                        columns={columns}
                        dataSource={_projectTypes}
                        loading={isGetProjectTypeLoading}
                        showSorterTooltip={{
                            target: 'sorter-icon',
                        }}
                    />
                </AccountsManagerWrapper>
            </ContentLayoutWrapper>
            <Modal
                title="Create project type"
                wrapClassName={'modalAddProjectType'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModal()}
            </Modal>
            <Modal
                title="Edit project type"
                wrapClassName={'modalAddProjectType'}
                open={isModalUpdateOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentUpdateModal()}
            </Modal>
        </>
    )
}

export default ProjectTypeManager;