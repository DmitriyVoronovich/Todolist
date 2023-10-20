import React, {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState} from "react";
import {FilterValueType} from "../App";
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    filter: string
    tasks: TaskType[]
    changeFilter: (value: FilterValueType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    setTasks: Dispatch<SetStateAction<{ id: string; title: string; isDone: boolean; }[]>>
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
            props.setTasks([task, ...props.tasks]);
            setNewTask('');
        } else {
            setError('Title is required')
        }
    }

    const removeTask = (id: string) => {
        let filterTask = props.tasks.filter(task =>
            task.id !== id)
        props.setTasks(filterTask)
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
            props.changeTaskStatus(item.id, newIsDoneValue);
        }

        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={onChangeIsDone} className={item.isDone ? 'is-done' : ''}/>
                <span>{item.title}</span>
                <button onClick={() => removeTask(item.id)} >✖️</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTask} onChange={onChangeInputHandler} onKeyUp={onKeyUp} className={error ? 'error' : ''}/>
                <button onClick={() => addTask(newTask)}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')} className={props.filter === 'all'? 'active-filter' : ''}>All</button>
                <button onClick={() => props.changeFilter('active')} className={props.filter === 'active'? 'active-filter' : ''}>Active</button>
                <button onClick={() => props.changeFilter('completed')} className={props.filter === 'completed'? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}