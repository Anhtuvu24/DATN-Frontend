import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Select,
    Space,
    Table,
    Dropdown,
    Modal,
    Form,
    Upload,
    Breadcrumb,
    Switch,
    Popover,
    Menu, Popconfirm
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineSearch, MdKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaRegStar  } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

// Styles
import {AccountsManagerWrapper, MoreOption, FormWrapper, SelectRole} from './local.styles';
import {ContentLayoutWrapper} from "../../components/MainLayout/local.styles.js";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createUser, deleteUser, getUsers, updateUser} from "../../redux/main/actions/user.js";
import createNotification from "../../utils/notificationHelper.js";

const options = [
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Inactive',
        value: 'inactive',
    },
    {
        value: 'all',
        label: 'All'
    }
];

const itemsBreadcrumb = [
    {
        title: 'Projects',
        path: '/home'
    },
    {
        title: 'Accounts',
        path: '/admin/account'
    },
];

const { Option } = Select;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function AccountsManager() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [isGetUserLoading, setIsGetUserLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const users = useSelector(state => state.main.entities.user.users) || [];

    const [record, setRecord] = useState(null);
    const [_users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsGetUserLoading(true);
            const res = await dispatch(getUsers(1, 100));
            if (res.status !== 200) {
                createNotification('error', 'An error occurred');
            }
        }
        fetchUsers();
        setIsGetUserLoading(false)
    }, [])



    useEffect(() => {
        setUsers(users);
    }, [users])

    useEffect(() => {
        if (!searchName && activeFilter === 'all') {
            setUsers(users);
        } else {
            const newUsers = users.filter((item) => {
                const isSameNameOrGmail = item.user_name?.toLowerCase().includes(searchName.toLowerCase().trim()) || item.gmail?.toLowerCase().includes(searchName.toString().trim());
                const isSameActive = activeFilter === 'active' ? item.is_active == true : activeFilter === 'inactive' ? item.is_active === false : true;
                return isSameActive && isSameNameOrGmail
            })
            setUsers(newUsers)
        }
    }, [searchName, activeFilter])

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    const onLeadChange = (value) => {
        form.setFieldsValue({
            lead: value,
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async (values) => {
        setIsLoadingCreate(true);
        const { userName, gmail, role } = values;
        const res = await dispatch(createUser({ user_name: userName, gmail, role }));
        if (res.status === 200 || res.status === 201) {
            createNotification('success', 'Created user success');
        } else {
            createNotification('error', res.error);
        }
        setIsLoadingCreate(false);
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const renderContentModal = () => {
        return (
            <FormWrapper form={form} onFinish={handleOk}>
                <Form.Item
                    name='userName'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder={'User name'} />
                </Form.Item>
                <Form.Item
                    name='gmail'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type={'email'} placeholder={'Gmail'} />
                </Form.Item>
                <Form.Item
                    name="role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a role"
                        onChange={onLeadChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="employee">Employee</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button loading={isLoadingCreate} type="primary" htmlType="submit">
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

    const onClick = async (_record, event) => {
        setRecord(_record)
    }

    const onChangeRole = async (id, value) => {
        const res = await dispatch(updateUser(id, { role: value }));
        if (res.status !== 200) {
            createNotification('error', 'An error occurred');
        }
    }

    const onChangeActive = async (id, value) => {
        const res = await dispatch(updateUser(id, { is_active: value }));
        if (res.status !== 200) {
            createNotification('error', 'An error occurred');
        }
    }

    const onConfirmDelete = async () => {
        const res = await dispatch(deleteUser(record.id));
        if (res.status !== 200) {
            createNotification('error', 'Delete user fail');
        }
    }

    const items = [
        {
            key: 'move_to_trash',
            label: <Popconfirm title={'Delete this user?'} onConfirm={onConfirmDelete}>
                <p>Move to trash</p>
            </Popconfirm>,
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.user_name}</p>,
            sorter: (a, b) => a.name.localeCompare(b.user_name),

        },
        {
            title: 'Gmail',
            dataIndex: 'gmail',
            key: 'gmail',
            render: (_, record) => <p>{record.gmail}</p>,
            sorter: (a, b) => a.gmail.localeCompare(b.gmail),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, record) => <SelectRole
                placeholder="Select a role"
                defaultValue={record.role}
                onChange={(value, option) => onChangeRole(record.id, value)}
                suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
            >
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="employee">Employee</Option>
            </SelectRole>,
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <Switch checked={record.is_active} onChange={(value, e) => onChangeActive(record.id, value)} />,
            sorter: (a, b) => a.is_active - b.is_active,
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

    const changeSearchName = (e) => {
        const value = e.target.value;
        setSearchName(value);
    }

    const onChageSelect = (value) => {
        setActiveFilter(value)
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
                        <Button onClick={showModal} type={"primary"}>Create user</Button>
                    </div>
                    <div className={'searchsWrapper'}>
                        <Input
                            value={searchName}
                            placeholder="Search users"
                            suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                            onChange={changeSearchName}
                        />
                        <Select
                            suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                            placeholder="Status"
                            onChange={onChageSelect}
                            defaultValue={'all'}
                            value={activeFilter}
                            options={options}
                            optionRender={(option) => (
                                <Space>
                                    <span role="img" aria-label={option.data.label}>
                                      {option.data.label}
                                    </span>
                                </Space>
                            )}
                        />
                    </div>
                    <Table
                        size={"small"}
                        columns={columns}
                        dataSource={_users}
                        loading={isGetUserLoading}
                        showSorterTooltip={{
                            target: 'sorter-icon',
                        }}
                    />
                </AccountsManagerWrapper>
            </ContentLayoutWrapper>
            <Modal
                title="Create user"
                wrapClassName={'modalAddUser'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                getContainer={triggerNode => triggerNode}
            >
                {renderContentModal()}
            </Modal>
        </>
    );
}

export default React.memo(AccountsManager);