import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./layout/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {addTodolist} from "./reducers/todolistReducer";
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

    const dispatch = useDispatch();

    const addedTodolist = useCallback((title: string) => {
        const action = addTodolist(title);
        dispatch(action);
    }, []);

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

export default AppWithRedux;

