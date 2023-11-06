import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./layout/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./layout/AddItemForm";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
};

export type TaskStateType = {
    [key: string]: TaskType[]
}

export enum FilterType {
    ALL, ACTIVE, COMPLETED
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Run', isDone: true},
            {id: v1(), title: 'Jump', isDone: true},
            {id: v1(), title: 'Swim', isDone: false},
            {id: v1(), title: 'Play football', isDone: false},
            {id: v1(), title: 'To go for a walk', isDone: false}
        ]
    });

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: FilterType.ALL},
        {id: todolistID2, title: 'Activities', filter: FilterType.ALL}
    ]);

    const changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(item => item.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    };

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    };

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    };

    const deleteTodolist = (id: string) => {
        setTodolists(todolists.filter(item => item.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(item => item.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    const changeTaskTitleValue = (id: string, title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(item => item.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        let todolist = todolists.find(item => item.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists])
        }
    };

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: FilterType.ALL};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []})
    };

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(todolist => {

                const filteredTasks = (filter: FilterType) => {

                    let allTodolistTasks = tasks[todolist.id];

                    switch (filter) {
                        case FilterType.ACTIVE:
                            return allTodolistTasks.filter(task => !task.isDone);
                        case FilterType.COMPLETED:
                            return allTodolistTasks.filter(task => task.isDone);
                        case FilterType.ALL:
                            return [...allTodolistTasks];
                        default:
                            return [];
                    }
                }

                return (
                    <Todolist title={todolist.title}
                              id={todolist.id}
                              key={todolist.id}
                              tasks={filteredTasks(todolist.filter)}
                              changeFilter={changeFilter}
                              changeTaskStatus={changeTaskStatus}
                              filter={todolist.filter}
                              removeTask={removeTask}
                              addTask={addTask}
                              deleteTodolist={deleteTodolist}
                              changeTaskTitleValue={changeTaskTitleValue}
                              changeTodolistTitle={changeTodolistTitle}/>
                )
            })}

        </div>
    );
}

export default App;

