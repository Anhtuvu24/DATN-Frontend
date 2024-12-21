import React, {useEffect, useState} from 'react';
import {Avatar, Space, Menu, Button} from 'antd';
import { MdGroups } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa6";


// Styles
import { SidebarWrapper } from './local.styles';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../AvatarCustom";
import actions from "../../redux/app/actions.js";

const { changeCurrent, changeCurrentAdmin } = actions;

function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const current_admin = useSelector(state => state.App.current_admin)
    const me = useSelector(state => state.main.entities.auth.user) || {};

    useEffect(() => {
        if (current_admin === 'project_type') {
            history.push('/admin/project-type');
        } else {
            history.push('/admin/account');
        }
    }, [current_admin])

    const onClick = ({item, key}) => {
        switch (key) {
            case 'role_assignment':
                dispatch(changeCurrentAdmin('role_assignment'));
                // history.push('/admin/account');
                return;
            case 'project_type':
                dispatch(changeCurrentAdmin('project_type'));
                // history.push('/admin/project-type');
                return;
            default:
                return;
        }
    }

    const items = [
        me.role === 'admin' && {
            key: 'role_assignment',
            icon: <MdGroups />,
            label: 'Role assignment',
        },
        me.role === 'admin' && {
            key: 'project_type',
            icon: <AiFillProject />,
            label: 'Project type',
        },
    ];

    return (
        <SidebarWrapper>
            <div className={'btnBack'}>
                <Button onClick={() => history.push('/home')}><FaChevronLeft /> Go home</Button>
            </div>
            <div className={'menuWrapper'}>
                <Menu
                    selectedKeys={[current_admin]}
                    mode="inline"
                    items={items}
                    onClick={onClick}
                />
            </div>
        </SidebarWrapper>
    );
}

export default React.memo(Sidebar);