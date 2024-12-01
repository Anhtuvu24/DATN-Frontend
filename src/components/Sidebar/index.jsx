import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import { MdGroups } from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

// Styles
import { SidebarWrapper } from './local.styles';

const items = [
    {
        key: 'board',
        icon: <HiViewBoards />,
        label: 'Board',
    },
    {
        key: 'admin_tool',
        icon: <MdGroups />,
        label: 'Admin tool',
    },
    {
        key: 'setting',
        icon: <IoMdSettings />,
        label: 'Setting',
    },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <SidebarWrapper>
            <div className={'projectInforWrapper'}>
                <Avatar size={40} shape="square" icon={<UserOutlined />} />
                <div className={'projectName'}>
                    <h3>Software Development</h3>
                    <p>Software project</p>
                </div>
            </div>
            <div className={'menuWrapper'}>
                <Menu
                    defaultSelectedKeys={['board']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </SidebarWrapper>
    );
}

export default React.memo(Sidebar);