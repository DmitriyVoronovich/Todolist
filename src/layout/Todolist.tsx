import React, {ChangeEvent} from "react";
import {FilterValueType} from "../App";
import {Button} from "../components/Button";
import {Input} from "../components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTask: string) => void
newTask: string
    setNewTask: (newTask: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNewTask(event.currentTarget.value);
    }

    const task = props.tasks.map((item) => {
        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span>{item.title}</span>
                <Button callback={() => {props.removeTask(item.id)}} name={'✖️'}/>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input callback={onChangeInputHandler} newTask={props.newTask}/>
                <Button name={'+'} callback={() => props.addTask(props.newTask)}/>
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