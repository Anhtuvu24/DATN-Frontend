import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Styles
import { TaskWrapper } from './local.styles.js';
import {Avatar, Dropdown, Menu, Popconfirm, Popover} from "antd";
import {MoreOption} from "../../Home/local.styles.js";
import {SlOptions} from "react-icons/sl";
import {useDispatch, useSelector} from "react-redux";
import AvatarCustom from "../../../components/AvatarCustom/index.jsx";
import dayjs from "dayjs";
import {deleteProject} from "../../../redux/main/actions/project.js";
import createNotification from "../../../utils/notificationHelper.js";
import {deleteTask} from "../../../redux/main/actions/task.js";
import Priority from "../../../components/Priority";
import {useHistory, useParams} from "react-router-dom";



function Task({ id, index, task }) {
    if (!task) return null
    const params = useParams();
    const projectId = params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const users = useSelector(state => state.main.entities.user?.all) || {};
    const user = users[task.id_assignee] || {};

    // const onClick = async (_record, event) => {
    // }

    const onConfirmDelete = async () => {
        const res = await dispatch(deleteTask(task.id));
        if (res.status === 200) {
            createNotification('success', 'Delete task successfully!')
        } else {
            createNotification('error', 'Delete task error!')
        }
    }

    const items = [
        {
            key: 'delete',
            label: <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={onConfirmDelete}
            ><p>Move to trash</p></Popconfirm>,
        },
    ];

    const onClickItem = () => {
        history.push(`/project/${projectId}/task/${task.id}`);
    }

    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {provided => (
                <TaskWrapper
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className='tasks__column--panel--item'
                    onClick={onClickItem}
                >
                    <div className={'header'}>
                        <p className={'title'} title={task.name}>
                            {task.name}
                        </p>
                        <div onClick={(e) => e.stopPropagation()}>
                            <Popover
                                content={<Menu items={items} selectedKeys={[]}/>}
                                arrow={false}
                                trigger='hover'
                                placement={'bottomRight'}
                                title={false}
                                key={task.id}
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
                    </div>
                    <div className={'footer'}>
                        <div className={'footerLeft'}>
                            <AvatarCustom size={24} name={user.user_name} src={user.avatar} />
                            <Priority type={task.priority} />
                        </div>
                        <p>Expired: {dayjs(task.expired_at).format('DD/MM')}</p>
                    </div>
                </TaskWrapper>
            )}
        </Draggable>
    )
}

export default React.memo(Task);