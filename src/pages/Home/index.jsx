import React from 'react';
import { Button, Input, Select, Space, Table, Tag } from "antd";
import { MdOutlineSearch, MdKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaRegStar  } from "react-icons/fa";

// Components
import MainLayout from "../../components/MainLayout";

// Images
import logoCVS from '../../assets/images/logo-cvs.svg';

// Styles
import { HomeWrapper } from './local.styles';

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

const columns = [
    {
        title: <FaStar fontSize={20} color={'#637381'} />,
        dataIndex: 'is_favorite',
        key: 'is_favorite',
        render: (_, record) => {
            const { is_favorite } = record;
            return is_favorite ? <FaRegStar fontSize={20} color={'#637381'} /> : <FaStar fontSize={20} color={'#637381'} />
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => <p>{record.name}</p>,
    },
    {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        render: (_, record) => <p>{record.key}</p>,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (_, record) => <p>{record.type}</p>,
    },
    {
        title: 'Lead',
        dataIndex: 'lead',
        key: 'lead',
        render: (_, record) => <p>{record.lead}</p>,
    },
    {
        title: 'More actions',
        dataIndex: 'lead',
        key: 'lead',
        render: (_, record) => <p>{record.lead}</p>,
    },
];
const data = [
    {
        is_favorite: true,
        name: 'Business Analysis',
        key: 'BA',
        type: 'Team-managed software',
        lead: 'Anh Tu',
    },
];

function Home() {
    return (
        <MainLayout>
            <HomeWrapper>
                <div className={'headerWrapper'}>
                    <h1>Projects</h1>
                    <Button type={"primary"}>Create project</Button>
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
                <Table columns={columns} dataSource={data} />
            </HomeWrapper>
        </MainLayout>
    );
}

export default React.memo(Home);