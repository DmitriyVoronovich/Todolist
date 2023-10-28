import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./layout/Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
export enum FilterType {
    ALL , ACTIVE, COMPLETED
}

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

    const filteredTasks = (filter: FilterType): TaskType[] => {

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

    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    const addTask = (task: TaskType) => {
        setTasks([task, ...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(item => item.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }



    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks(filter)}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
                      removeTask={removeTask}
                      addTask={addTask}/>
        </div>
    );
}

export default App;

