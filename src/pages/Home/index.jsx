import React, { useState } from 'react';
import {Button, Input, Select, Space, Table, Dropdown, Modal, Form, Upload, Menu, Popover} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineSearch, MdKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaRegStar  } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

// Styles
import { HomeWrapper, MoreOption, FormWrapper } from './local.styles';
import { ContentLayoutWrapper } from "../../components/MainLayout/local.styles.js";
import {useHistory} from "react-router-dom";

const options = [
    {
        label: 'China',
        value: 'china',
        emoji: '🇨🇳',
        desc: 'China (中国)',
    },
    {
        label: 'USA',
        value: 'usa',
        emoji: '🇺🇸',
        desc: 'USA (美国)',
    },
    {
        label: 'Japan',
        value: 'japan',
        emoji: '🇯🇵',
        desc: 'Japan (日本)',
    },
    {
        label: 'Korea',
        value: 'korea',
        emoji: '🇰🇷',
        desc: 'Korea (韩国)',
    },
];

const items = [
    {
        key: 'project_setting',
        label: <p>Project settings</p>,
    },
    {
        key: 'move_to_trash',
        label: 'Move to trash',
    },
];

const data = [
    {
        is_favorite: true,
        name: 'Business Analysis-1',
        key: 'BA-1',
        type: 'ATeam-managed software-1',
        lead: 'Anh Tu-1',
    },

    {
        is_favorite: false,
        name: 'Business Analysis',
        key: 'BA',
        type: 'Team-managed software',
        lead: 'Anh Tu',
    },
    {
        is_favorite: true,
        name: 'Business Analysis-2',
        key: 'BA-2',
        type: 'BTeam-managed software-1',
        lead: 'Anh Tu-2',
    },
];

const { Option } = Select;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function Home() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

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
                        placeholder="Select a lead"
                        onChange={onLeadChange}
                        allowClear
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
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

    const onRowTable = (record, index) => {
        history.push('/project/1')
    }

    const onClick = async (_record, event) => {

    }

    const columns = [
        {
            title: <FaStar fontSize={18} color={'#637381'} />,
            dataIndex: 'is_favorite',
            key: 'is_favorite',
            width: 60,
            render: (_, record) => {
                const { is_favorite } = record;
                return is_favorite ? <FaStar fontSize={20} color={'#637381'} /> : <FaRegStar fontSize={20} color={'#637381'} />
            },
            sorter: (a, b) => a.is_favorite - b.is_favorite,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
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
            render: (_, record) => <p>{record.type}</p>,
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Lead',
            dataIndex: 'lead',
            key: 'lead',
            render: (_, record) => <p>{record.lead}</p>,
            sorter: (a, b) => a.lead.localeCompare(b.lead),
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
                <HomeWrapper>
                    <div className={'headerWrapper'}>
                        <h1>Projects</h1>
                        <Button onClick={showModal} type={"primary"}>Create project</Button>
                    </div>
                    <div className={'searchsWrapper'}>
                        <Input placeholder="Search projects" suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}/>
                        <Select
                            mode="multiple"
                            suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                            placeholder="select one country"
                            defaultValue={['china']}
                            // onChange={handleChange}
                            options={options}
                            optionRender={(option) => (
                                <Space>
                                <span role="img" aria-label={option.data.label}>
                                  {option.data.emoji}
                                </span>
                                    {option.data.desc}
                                </Space>
                            )}
                        />
                    </div>
                    <Table
                        size={"small"}
                        columns={columns}
                        dataSource={data}
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
        </>
    );
}

export default React.memo(Home);