import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Styles
import { TaskWrapper } from './local.styles.js';
import {Avatar, Dropdown} from "antd";
import {MoreOption} from "../../Home/local.styles.js";
import {SlOptions} from "react-icons/sl";

const items = [
    {
        key: 'delete',
        label: <p>Delete</p>,
    },
];

function Task({ id, index, task }) {
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
                >
                    <div className={'header'}>
                        <p className={'title'} title={task.title}>
                            {task.title}
                        </p>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            arrow={false}
                            className={'optionTask'}
                            placement="bottomRight"
                            trigger={'click'}
                            getPopupContainer={triggerNode => triggerNode}
                        >
                            <MoreOption>
                                <SlOptions fontSize={20} color={'#637381'} />
                            </MoreOption>
                        </Dropdown>
                    </div>
                    <div className={'footer'}>
                        <Avatar size={24}>K</Avatar>
                        <p>Hạn 22/11</p>
                    </div>
                </TaskWrapper>
            )}
        </Draggable>
    )
}

export default React.memo(Task);