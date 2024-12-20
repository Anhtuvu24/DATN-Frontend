import React, {useEffect, useState} from 'react';
import {Avatar, Space, Menu, Button} from 'antd';
import { MdGroups } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";


// Styles
import { SidebarWrapper } from './local.styles';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../AvatarCustom";
import actions from "../../redux/app/actions.js";

const { changeCurrent } = actions;

function Sidebar() {
    const history = useHistory();
    const current_admin = useSelector(state => state.App.current_admin)
    const me = useSelector(state => state.main.entities.auth.user) || {};

    const onClick = ({item, key}) => {
        switch (key) {
            case 'role_assignment':
                history.push('/account');
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
    ];

    return (
        <SidebarWrapper>
            <div className={'btnBack'}>
                <Button onClick={() => history.push('/home')}><FaChevronLeft /> Go home</Button>
            </div>
            <div className={'menuWrapper'}>
                <Menu
                    selectedKeys={[current_admin]}
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