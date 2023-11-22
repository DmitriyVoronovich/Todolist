import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    id: string
    filter: FilterType
    tasks: TaskType[]
    changeFilter: (value: FilterType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (task: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitleValue: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const filteredTasks = (filter: FilterType) => {

        switch (filter) {
            case FilterType.ACTIVE:
                return props.tasks.filter(task => !task.isDone);
            case FilterType.COMPLETED:
                return props.tasks.filter(task => task.isDone);
            case FilterType.ALL:
                return [...props.tasks];
            default:
                return [];
        }
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id);
    };

    const onChangeTaskTitle = (title: string, id: string) => {
        props.changeTaskTitleValue(id, title, props.id)
    };

    const onAllClickHandler = () => {
        props.changeFilter(FilterType.ALL, props.id)
    };

    const onActiveClickHandler = () => {
        props.changeFilter(FilterType.ACTIVE, props.id)
    };

    const onCompletedClickHandler = () => {
        props.changeFilter(FilterType.COMPLETED, props.id)
    };

    const onTodolistDelete = () => {
        props.deleteTodolist(props.id)
    };

    const task = filteredTasks(props.filter).map((item) => {
        const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(item.id, newIsDoneValue, props.id);
        };

        return (
            <li key={item.id}>
                <Checkbox checked={item.isDone}
                          onChange={onChangeIsDone}
                          className={item.isDone ? 'is-done' : ''}
                          color='primary'/>
                <EditableSpan value={item.title} onChange={(title)=>onChangeTaskTitle(item.id, title)}/>
                <IconButton onClick={() => props.removeTask(item.id, props.id)}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={onTodolistDelete}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>
            <ul>
                {task}
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === FilterType.ALL ? 'outlined' : 'contained'}
                        color='secondary'>
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === FilterType.ACTIVE ? 'outlined' : 'contained'}
                        color='secondary'
                        style={{margin:'0 5px'}}
                >
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === FilterType.COMPLETED ? 'outlined' : 'contained'}
                        color='secondary'
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}