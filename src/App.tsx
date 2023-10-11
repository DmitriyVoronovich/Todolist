import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed';
function App() {
    const [tasks, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValueType>('all')

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

    const removeTask = (id: number) => {
        let filterTask = tasks.filter(task =>
            task.id !== id)
        setTask(filterTask)
    }



    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={taskForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

