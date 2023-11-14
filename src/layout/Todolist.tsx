import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    }

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
                <IconButton onClick={() => props.deleteTodolist(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>
            <ul>
                {task}
            </ul>
            <div>
                <Button onClick={() => props.changeFilter(FilterType.ALL, props.id)}
                        variant={props.filter === FilterType.ALL ? 'outlined' : 'text'}
                        color='secondary'>
                    All
                </Button>
                <Button onClick={() => props.changeFilter(FilterType.ACTIVE, props.id)}
                        variant={props.filter === FilterType.ACTIVE ? 'outlined' : 'text'}
                        color='info'
                >
                    Active
                </Button>
                <Button onClick={() => props.changeFilter(FilterType.COMPLETED, props.id)}
                        variant={props.filter === FilterType.COMPLETED ? 'outlined' : 'text'}
                        color='inherit'
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}