import React, { useState, useMemo } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Button } from "antd";
import { Droppable } from 'react-beautiful-dnd';

// Components
import Task from "../Task/index.jsx";

// Styles
import { TasksWrapper } from './local.styles.js';

function Tasks({ id, tasks, usersSelect, nameSearch, setRecord, onClickCreateTask }) {

    const _tasks = useMemo(() => {
        const newTasks = tasks.sort((a,  b) => a.index - b.index);
        return newTasks;
    }, [tasks]);

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
                        {_tasks.map((item, index) => {
                            return (
                                <Task
                                    id={item.id}
                                    isHidden={(!usersSelect.includes(item.id_assignee) && usersSelect?.length > 0) ||
                                        (!item.name?.toLowerCase().includes(nameSearch?.toLowerCase()) && nameSearch)
                                }
                                    index={index} key={item.id}
                                    task={item}
                                />
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