import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./layout/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {
    addTask,
    changeTaskStatus,
    changeTaskTitleValue,
    removeTask,
    tasksReducer
} from "./reducers/tasksReducer";
import {
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistReducer,
    addTodolist
} from "./reducers/todolistReducer";

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

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'Run', isDone: false},
                {id: v1(), title: 'Jump', isDone: true},
                {id: v1(), title: 'Swim', isDone: true},
                {id: v1(), title: 'Play football', isDone: true},
                {id: v1(), title: 'To go for a walk', isDone: false}
            ]
        });

    const [todolist, dispatchTodolist] = useReducer(todolistReducer, [
            {id: todolistID1, title: 'What to learn', filter: FilterType.ALL},
            {id: todolistID2, title: 'Activities', filter: FilterType.ALL}
        ]);

    const changedFilter = (todolistId: string, value: FilterType) => {
        dispatchTodolist(changeFilter(todolistId, value));
    };

    const addTasks = (todolistId: string, title: string) => {
        dispatchTasks(addTask(todolistId, title));
    };

    const removeTasks = (todolistId: string, id: string) => {
        dispatchTasks(removeTask(todolistId, id));
    };

    const deleteTodolist = (todolistId: string) => {
        const action = removeTodolist(todolistId)
        dispatchTodolist(action);
        dispatchTasks(action);
    }

    const changeTasksStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatus(todolistId, id, isDone));
    };

    const changeTasksTitleValue = (todolistId: string, id: string, title: string) => {
        dispatchTasks(changeTaskTitleValue(todolistId, id, title));
    };

    const changedTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolist(changeTodolistTitle(todolistId, title));
    };

    const addedTodolist = (title: string) => {
        const action = addTodolist(title);
        dispatchTodolist(action);
        dispatchTasks(action);
    };

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addedTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(todolist => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist todolist={todolist}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

// title={todolist.title}
// todolistId={todolist.id}
// key={todolist.id}
// tasks={tasks[todolist.id]}
// changeFilter={changedFilter}
// changeTaskStatus={changeTasksStatus}
// filter={todolist.filter}
// removeTask={removeTasks}
// addTask={addTasks}
// deleteTodolist={deleteTodolist}
// changeTaskTitleValue={changeTasksTitleValue}
// changeTodolistTitle={changedTodolistTitle}

export default App;

