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
    changeFilter: (todolistId: string, value: FilterType) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, task: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitleValue: (todolistId: string, id: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
        props.addTask(props.id, title)
    };

    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    };

    const onChangeTaskTitle = (id: string, title: string) => {
        props.changeTaskTitleValue(props.id, id, title)
    };

    const onAllClickHandler = () => {
        props.changeFilter(props.id, FilterType.ALL)
    };

    const onActiveClickHandler = () => {
        props.changeFilter(props.id, FilterType.ACTIVE)
    };

    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, FilterType.COMPLETED)
    };

    const onTodolistDelete = () => {
        props.deleteTodolist(props.id)
    };

    const task = filteredTasks(props.filter).map((item) => {
        const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(props.id, item.id, newIsDoneValue);
        };

        return (
            <li key={item.id}>
                <Checkbox checked={item.isDone}
                          onChange={onChangeIsDone}
                          className={item.isDone ? 'is-done' : ''}
                          color='primary'/>
                <EditableSpan value={item.title} onChange={(title)=>onChangeTaskTitle(item.id, title)}/>
                <IconButton onClick={() => props.removeTask(props.id, item.id)}>
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