import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./layout/Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValueType>('all');

    let taskForTodoList = tasks;

    if (filter === 'active') {
        taskForTodoList = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        taskForTodoList = tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodoList}
                      changeFilter={changeFilter}
                      setTask={setTask}/>
        </div>
    );
}

export default App;

