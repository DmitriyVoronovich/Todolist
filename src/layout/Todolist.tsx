import React, {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState} from "react";
import {FilterValueType} from "../App";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    changeFilter: (value: FilterValueType) => void
    setTask: Dispatch<SetStateAction<{ id: string; title: string; isDone: boolean; }[]>>
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTask, setNewTask] = useState('');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value);
    }

    const addTask = (newTask: string) => {
        let task = {id: v1(), title: newTask, isDone: false}
        props.setTask([task, ...props.tasks])
        setNewTask('')
    }

    const removeTask = (id: string) => {
        let filterTask = props.tasks.filter(task =>
            task.id !== id)
        props.setTask(filterTask)
    }

    const onKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTask(newTask)
        }
    }

    const task = props.tasks.map((item) => {
        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span>{item.title}</span>
                <Button callback={() => {
                    removeTask(item.id)
                }} name={'✖️'}/>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input callback={onChangeInputHandler} newTask={newTask} onKeyUp={onKeyUp}/>
                <Button name={'+'} callback={() => addTask(newTask)}/>
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <Button name={'All'} callback={() => props.changeFilter('all')}/>
                <Button name={'Active'} callback={() => props.changeFilter('active')}/>
                <Button name={'Completed'} callback={() => props.changeFilter('completed')}/>
            </div>
        </div>
    )
}