import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../components/EditableSpan";

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

    const task = filteredTasks(props.filter).map((item) => {
        const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(item.id, newIsDoneValue, props.id);
        };

        const onChangeTaskTitle = (title: string) => {
            props.changeTaskTitleValue(item.id, title, props.id)
        }

        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={onChangeIsDone}
                       className={item.isDone ? 'is-done' : ''}/>
                <EditableSpan value={item.title} onChange={onChangeTaskTitle}/>
                <button onClick={() => props.removeTask(item.id, props.id)}>✖️</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <button onClick={() => props.deleteTodolist(props.id)}>✖️</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {task}
            </ul>
            <div>
                <button onClick={() => props.changeFilter(FilterType.ALL, props.id)}
                        className={props.filter === FilterType.ALL ? 'active-filter' : ''}>All
                </button>
                <button onClick={() => props.changeFilter(FilterType.ACTIVE, props.id)}
                        className={props.filter === FilterType.ACTIVE ? 'active-filter' : ''}>Active
                </button>
                <button onClick={() => props.changeFilter(FilterType.COMPLETED, props.id)}
                        className={props.filter === FilterType.COMPLETED ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}