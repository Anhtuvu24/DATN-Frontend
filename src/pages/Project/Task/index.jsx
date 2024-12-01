import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Styles
import { TaskWrapper } from './local.styles.js';
import {Avatar} from "antd";

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
                    <p className={'title'} title={task.title}>
                        {task.title}
                    </p>
                    <div className={'footer'}>
                        <Avatar>K</Avatar>
                        <p>Hạn 22/11</p>
                    </div>
                </TaskWrapper>
            )}
            {/*<TaskWrapper>*/}
            {/*    <p className={'title'} title={'Người dùng muốn có option "Không hiển thị thông báo"'}>*/}
            {/*        Người dùng muốn có option "Không hiển thị thông báo"*/}
            {/*    </p>*/}
            {/*    <div className={'footer'}>*/}
            {/*        <Avatar>K</Avatar>*/}
            {/*        <p>Hạn 22/11</p>*/}
            {/*    </div>*/}
            {/*</TaskWrapper>*/}
        </Draggable>
    )
}

export default React.memo(Task);