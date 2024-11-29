import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

// Styles
import { SidebarWrapper } from './local.styles';

const items = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: 'Option 1',
    },
    {
        key: '2',
        icon: <DesktopOutlined />,
        label: 'Option 2',
    },
    {
        key: '3',
        icon: <ContainerOutlined />,
        label: 'Option 3',
    },
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
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
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </SidebarWrapper>
    );
}

export default React.memo(Sidebar);