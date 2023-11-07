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
        setTodolists(todolists.map(item => item.id === todolistId ? {...item, filter: value} : item));
    };
    //пересмотреть весь код и по возможности переписать функции по похожему синтаксису как и выше (главное разобраться, что тут происходит)

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task,...tasks[todolistId]]});
    };

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item => item.id !== id)});
    };

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(item => item.id !== todolistId));
        delete tasks[todolistId];
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(item => item.id === id ? {...item, isDone} : item)});
    };

    const changeTaskTitleValue = (id: string, title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(item => item.id === id ? {...item, title} : item)});
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists([...todolists.map(item => item.id === todolistId ? {...item, title} : item)]);
    };

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: FilterType.ALL};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []});
    };

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(todolist => {
                const filteredTasks = (filter: FilterType) => {

                    switch (filter) {
                        case FilterType.ACTIVE:
                            return tasks[todolist.id].filter(task => !task.isDone);
                        case FilterType.COMPLETED:
                            return tasks[todolist.id].filter(task => task.isDone);
                        case FilterType.ALL:
                            return [...tasks[todolist.id]];
                        default:
                            return [];
                    }
                }
                //перенести фильтрацию в нутрь компоненты Todolist

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

