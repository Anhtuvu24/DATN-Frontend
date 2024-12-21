import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {Avatar, Breadcrumb, Input, Popover, Select, Skeleton} from "antd";
import {IssuesWrapper, TaskWrapper} from "./local.styles.js";
import {useHistory} from "react-router-dom";
import {MdOutlineSearch} from "react-icons/md";
import {SelectOptionItem, UserItem} from "../local.styles.js";
import AvatarCustom from "../../../components/AvatarCustom/index.jsx";
import {LabelStatusItem} from "../../../components/TaskInforDetail/local.styles.js";
import Priority from "../../../components/Priority/index.jsx";
import dayjs from "dayjs";
import TaskDetail from "./TaskDetail/index.jsx";
import {UserOutlined} from "@ant-design/icons";

function Issues({ isGetProject }) {
    const history = useHistory();

    const [nameSearch, setNameSearch] = useState('');
    const [listAssignee, setListAssignee] = useState([]);
    const [listStatus, setListStatus] = useState([]);
    const [taskSelectId, setTaskSelectId] = useState(null);

    const statuses = useSelector(state => state.main.entities.status.statuses) || [];
    const optionStatus = statuses.map((item, index) => {
        const colorBGStatus = item.name === "TO DO" ? '#091E420F' :item.name === 'DONE' ? '#DCFFF1' : '#E9F2FF';
        const colorStatus = item.name === "TO DO" ? '#44546F' :item.name === 'DONE' ? '#216E4E' : '#0055CC';
        return {
            value: item.id,
            label: <LabelStatusItem bgColor={colorBGStatus} color={colorStatus}>{item.name}</LabelStatusItem>,
        }
    })
    const users = useSelector(state => state.main.entities.user.users) || [];
    const usersAll = useSelector(state => state.main.entities.user.all) || {};
    const currentProject = useSelector(state => state.main.entities.project?.currentProject) || {};
    const { active_sprints = [] } = currentProject || {};
    const tasks = useSelector(state => state.main.entities.task.tasks) || {};
    const categories = tasks[active_sprints[0]?.id] || [];
    const mergeTasks = useMemo(() => {
        let _task = [];
        categories.map(item => {
            _task = [..._task, ...item.tasks];
        });
        return _task;
    }, [categories])
    const itemsBreadcrumb = [
        {
            title: isGetProject ? <Skeleton.Button active={true} size={"small"} /> : 'Projects',
            path: '/home'
        },
        {
            title: isGetProject ? <Skeleton.Button active={true} size={"small"} /> : currentProject?.name,
            path: `/project/${currentProject?.id}`
        },
    ];

    const onClickBreadcrumb = (path) => {
        history.push(path);
    }

    const onChangeSearch = (e) => {
        setNameSearch(e.target.value);
    }

    const onChangeAssignee = (value, option) => {
        setListAssignee(value);
    }

    const onChangeStatus = (value, option) => {
        setListStatus(value);
    }

    const onClickTask = (id) => {
        setTaskSelectId(id);
    }

    return (
        <IssuesWrapper>
            <Breadcrumb>
                {itemsBreadcrumb.map(item => {
                    return (
                        <Breadcrumb.Item onClick={() => onClickBreadcrumb(item.path)}>{item.title}</Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
            <h1>Issues</h1>
            <div className={'searchAndFilterNav'}>
                <Input
                    style={{ width: 250 }}
                    onChange={onChangeSearch}
                    value={nameSearch}
                    placeholder="Search"
                    prefix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                />
                <Select style={{ width: 200 }} mode={'multiple'} maxTagCount={'responsive'} placeholder={'Assignee'} onChange={onChangeAssignee}>
                    <Option value={null}>
                        <SelectOptionItem>
                            <Avatar size={24} icon={<UserOutlined />} />
                            <p>No assignee</p>
                        </SelectOptionItem>
                    </Option>

                    {users.map(item => {
                        return (
                            <Option value={item.id} key={item?.id} >
                                <SelectOptionItem>
                                    <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} />
                                    <p>{item?.user_name}</p>
                                </SelectOptionItem>
                            </Option>
                        )
                    })}
                </Select>
                <Select
                    style={{ width: 200 }}
                    mode={"multiple"}
                    maxTagCount={"responsive"}
                    placeholder={'Status'}
                    options={optionStatus}
                    onChange={onChangeStatus}
                />
            </div>
            <div className={'filterContent'}>
                <div className={'listTask'}>
                    <h3>Result</h3>
                    {mergeTasks.map(item => {
                        const user = usersAll[item.id_assignee] || {};
                        const isHidden = (!item.name?.toLowerCase().includes(nameSearch?.toLowerCase()) && nameSearch)
                            || (!listAssignee.includes(item.id_assignee) && listAssignee.length)
                            || (!listStatus.includes(item.id_status) && listStatus.length);
                        return (
                            <TaskWrapper
                                style={{ background: taskSelectId === item.id ? '#E4E6EA' : '#FFFFFF' }}
                                onClick={() => {onClickTask(item.id)}}
                                isHidden={isHidden}
                                key={item.id}
                            >
                                <div className={'header'}>
                                    <p className={'title'} title={item.name}>
                                        {item.name}
                                    </p>
                                </div>
                                <div className={'footer'}>
                                    <div className={'footerLeft'}>
                                        <AvatarCustom size={24} name={user.user_name} src={user.avatar} />
                                        <Priority type={item.priority} />
                                    </div>
                                    <p>Expired: {dayjs(item.expired_at).format('DD/MM')}</p>
                                </div>
                            </TaskWrapper>
                        )
                    })}
                </div>
                <div className={'taskDetail'}>
                    <div>
                        {taskSelectId && <TaskDetail taskId={taskSelectId} idProject={currentProject.id} />}
                    </div>
                </div>
            </div>
        </IssuesWrapper>
    )
}

export default React.memo(Issues);