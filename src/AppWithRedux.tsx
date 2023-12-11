import React from 'react';
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
} from "./reducers/tasksReducer";
import {
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    addTodolist
} from "./reducers/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const changedFilter = (todolistId: string, value: FilterType) => {
        dispatch(changeFilter(todolistId, value));
    };

    const addTasks = (todolistId: string, title: string) => {
        dispatch(addTask(todolistId, title));
    };

    const removeTasks = (todolistId: string, id: string) => {
        dispatch(removeTask(todolistId, id));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatch(removeTodolist(todolistId));
    }

    const changeTasksStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatus(todolistId, id, isDone));
    };

    const changeTasksTitleValue = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleValue(todolistId, id, title));
    };

    const changedTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitle(todolistId, title));
    };

    const addedTodolist = (title: string) => {
        const newTodolistId = v1();
        dispatch(addTodolist(newTodolistId, title));
    };

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addedTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist title={todolist.title}
                                              todolistId={todolist.id}
                                              key={todolist.id}
                                              tasks={tasks[todolist.id]}
                                              changeFilter={changedFilter}
                                              changeTaskStatus={changeTasksStatus}
                                              filter={todolist.filter}
                                              removeTask={removeTasks}
                                              addTask={addTasks}
                                              deleteTodolist={deleteTodolist}
                                              changeTaskTitleValue={changeTasksTitleValue}
                                              changeTodolistTitle={changedTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

