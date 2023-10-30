import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "../App";
import {v1} from "uuid";

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
    addTask: (task: TaskType, todolistId: string) => void
    deleteTodolist: (id: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTask, setNewTask] = useState('');

    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
    }

    const addTask = (newTask: string) => {
        if (newTask.trim() !== '') {
            let task = {id: v1(), title: newTask.trim(), isDone: false};
            props.addTask(task, props.id);
            setNewTask('');
        } else {
            setError('Title is required')
        }
    }

    const onKeyUp = (event: KeyboardEvent) => {
        setError(null);
        if (event.key === 'Enter') {
            addTask(newTask)
        }
    }

    const task = props.tasks.map((item) => {
        const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = event.currentTarget.checked;
            props.changeTaskStatus(item.id, newIsDoneValue, props.id);
        }

        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={onChangeIsDone} className={item.isDone ? 'is-done' : ''}/>
                <span>{item.title}</span>
                <button onClick={() => props.removeTask(item.id, props.id)} >✖️</button>
            </li>
        )
    })

    return (
        <div>
            <div className={'title'}>
                <h3>{props.title}</h3>
                <button onClick={() => props.deleteTodolist(props.id)}>✖️</button>
            </div>
            <div>
                <input value={newTask} onChange={onChangeInputHandler} onKeyUp={onKeyUp} className={error ? 'error' : ''}/>
                <button onClick={() => addTask(newTask)}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <button onClick={() => props.changeFilter(FilterType.ALL, props.id)} className={props.filter === FilterType.ALL ? 'active-filter' : ''}>All</button>
                <button onClick={() => props.changeFilter(FilterType.ACTIVE, props.id)} className={props.filter === FilterType.ACTIVE ? 'active-filter' : ''}>Active</button>
                <button onClick={() => props.changeFilter(FilterType.COMPLETED, props.id)} className={props.filter === FilterType.COMPLETED ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}