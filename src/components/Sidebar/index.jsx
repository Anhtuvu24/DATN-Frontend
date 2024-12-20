import React, {useEffect, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import { MdGroups } from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

// Styles
import { SidebarWrapper } from './local.styles';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../AvatarCustom";
import actions from "../../redux/app/actions.js";

const { changeCurrent } = actions;

function Sidebar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.main.entities.project?.currentProject) || {};
    const me = useSelector(state => state.main.entities.auth.user) || {};

    const onClick = ({item, key}) => {
        switch (key) {
            case 'role_assignment':
                history.push('/account');
                return;
            case  'board':
                // history.push('/home')
                dispatch(changeCurrent(key));
                return;
            case 'issues':
                dispatch(changeCurrent(key));
                return;
            default:
                return;
        }
    }

    const items = [
        {
            key: 'board',
            icon: <HiViewBoards />,
            label: 'Board',
        },
        {
            key: 'issues',
            icon: <FaTasks />,
            label: 'Issues',
        },
    ];

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
                    items={items}
                    onClick={onClick}
                />
            </div>
        </SidebarWrapper>
    );
}

export default React.memo(Sidebar);