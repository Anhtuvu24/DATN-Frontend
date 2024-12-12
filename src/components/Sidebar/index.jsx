import React, {useEffect, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import { MdGroups } from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

// Styles
import { SidebarWrapper } from './local.styles';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import AvatarCustom from "../AvatarCustom";

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
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const currentProject = useSelector(state => state.main.entities.project?.currentProject) || {};
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onClick = ({item, key}) => {
        switch (key) {
            case 'admin_tool':
                history.push('/account');
                return;
            case  'board':
                history.push('/home')
                return;
            default:
                return;
        }
    }

    return (
        <SidebarWrapper>
            <div className={'projectInforWrapper'}>
                {currentProject.name && <AvatarCustom size={40} type={'square'} name={currentProject.name || ''} src={currentProject.icon || ''} />}
                <div className={'projectName'}>
                    <h3>{currentProject.name}</h3>
                    <p>{currentProject.project_type_name}</p>
                </div>
            </div>
            <div className={'menuWrapper'}>
                <Menu
                    defaultSelectedKeys={['board']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={onClick}
                />
            </div>
        </SidebarWrapper>
    );
}

export default React.memo(Sidebar);