import React from "react";
import {FilterValueType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void

}

export const Todolist = (props: TodolistPropsType) => {
    const task = props.tasks.map((item) => {
        return (
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span>{item.title}</span>
                <button onClick={() => {props.removeTask(item.id)}}>✖️</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}