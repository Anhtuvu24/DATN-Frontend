import React, { useState } from 'react';
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
    Menu
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineSearch, MdKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaRegStar  } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

// Styles
import { AccountsManagerWrapper, MoreOption, FormWrapper } from './local.styles';
import {ContentLayoutWrapper} from "../../components/MainLayout/local.styles.js";
import {useHistory} from "react-router-dom";

const options = [
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Inactive',
        value: 'inactive',
    },
];
const items = [
    {
        key: 'move_to_trash',
        label: 'Move to trash',
    },
];

const data = [
    {
        is_active: true,
        name: 'Business Analysis-1',
        gmail: 'BA-1@gmail.com',
        role: 'Admin',
    },

    {
        is_active: false,
        name: 'Business Analysis',
        gmail: 'BA@gmail.com',
        role: 'Employee',
    },
    {
        is_active: true,
        name: 'Business Analysis-2',
        gmail: 'BA-2@gmail.com',
        role: 'Manager',
    },
];

const itemsBreadcrumb = [
    {
        title: 'Projects',
        path: '/home'
    },
    {
        title: 'Accounts',
        path: '/account'
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
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

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
    const handleOk = (values) => {
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
                    <Input placeholder={'Gmail'} />
                </Form.Item>
                <Form.Item name='description'>
                    <Input.TextArea placeholder={'Description'} />
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
                        <Option value="Admin">Admin</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="Employee">Employee</Option>
                    </Select>
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
            </FormWrapper>
        )
    }

    const onClick = async (_record, event) => {

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
            sorter: (a, b) => a.name.localeCompare(b.name),

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
            render: (_, record) => <p>{record.role}</p>,
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <Switch checked={record.is_active} />,
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
                        <Input placeholder="Search users" suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}/>
                        <Select
                            suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                            placeholder="Status"
                            // onChange={handleChange}
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
                        dataSource={data}
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