import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
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
    todolistId: string
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
    const {
        title, todolistId, deleteTodolist, filter, changeFilter, changeTodolistTitle,
        changeTaskTitleValue, addTask, changeTaskStatus, tasks, removeTask
    } = props;

    const filteredTasks = (filter: FilterType) => {

        switch (filter) {
            case FilterType.ACTIVE:
                return tasks.filter(task => !task.isDone);
            case FilterType.COMPLETED:
                return tasks.filter(task => task.isDone);
            case FilterType.ALL:
                return [...tasks];
            default:
                return [];
        }
    }

    const addedTask = (title: string) => {
        addTask(todolistId, title)
    };

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todolistId, title);
    };

    const onChangeTaskTitle = (id: string, title: string) => {
        changeTaskTitleValue(todolistId, id, title)
    };

    const onAllClickHandler = () => {
        changeFilter(todolistId, FilterType.ALL)
    };

    const onActiveClickHandler = () => {
        changeFilter(todolistId, FilterType.ACTIVE)
    };

    const onCompletedClickHandler = () => {
        changeFilter(todolistId, FilterType.COMPLETED)
    };

    const onTodolistDelete = () => {
        deleteTodolist(todolistId)
    };

    const task = filteredTasks(filter).map((item) => {
        const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = event.currentTarget.checked;
            changeTaskStatus(todolistId, item.id, newIsDoneValue);
        };

        return (
            <li key={item.id}>
                <Checkbox checked={item.isDone}
                          onChange={onChangeIsDone}
                          className={item.isDone ? 'is-done' : ''}
                          color='primary'/>
                <EditableSpan value={item.title} onChange={(title) => onChangeTaskTitle(item.id, title)}/>
                <IconButton onClick={() => removeTask(todolistId, item.id)}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={onTodolistDelete}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addedTask}/>
            <ul>
                {task}
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={filter === FilterType.ALL ? 'outlined' : 'contained'}
                        color='primary'>
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                        variant={filter === FilterType.ACTIVE ? 'outlined' : 'contained'}
                        color='primary'
                        style={{margin: '0 5px'}}
                >
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={filter === FilterType.COMPLETED ? 'outlined' : 'contained'}
                        color='primary'
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}