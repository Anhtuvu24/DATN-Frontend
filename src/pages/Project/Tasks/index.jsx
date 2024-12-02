import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Button } from "antd";
import { Droppable } from 'react-beautiful-dnd';

// Components
import Task from "../Task/index.jsx";

// Styles
import { TasksWrapper } from './local.styles.js';

function Tasks({ id, tasks, setRecord, onClickCreateTask }) {

    const openCreateTask = () => {
        setRecord(id);
        onClickCreateTask()
    }

    return (
        <Droppable droppableId={id}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <TasksWrapper>
                        {tasks.map((item, index) => {
                            return (
                                <Task id={item.id} index={index} key={item.id} task={item} />
                            )
                        })}
                        {provided.placeholder}
                        <Button onClick={openCreateTask} type={"text"}><IoMdAdd/> Create task</Button>
                    </TasksWrapper>
                </div>
            )}
        </Droppable>
    )
}

export default React.memo(Tasks);