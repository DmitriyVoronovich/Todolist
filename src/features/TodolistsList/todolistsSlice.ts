import { todolistsAPI, TodolistType } from "api/todolists-api";
import { appActions, RequestStatusType } from "app/appSlice";
import { handleServerNetworkError } from "utils/error-utils";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasksTC } from "features/TodolistsList/tasksSlice";

export const slice = createSlice({
    name: "todolist",
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].title = action.payload.title;
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
        ) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        },
        setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            action.payload.todolists.forEach((todo) => {
                state.push({ ...todo, filter: "all", entityStatus: "idle" });
            });
        },
        clearTodolistsData: (state, action) => {
            state = [];
        },
    },
});

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        todolistsAPI
            .getTodolists()
            .then((res) => {
                dispatch(todolistsActions.setTodolists({ todolists: res.data }));
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return res.data;
            })
            .then((todos) => {
                todos.forEach((todo) => {
                    dispatch(fetchTasksTC(todo.id));
                });
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatus({ status: "loading" }));
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            dispatch(todolistsActions.removeTodolist({ todolistId }));
            //скажем глобально приложению, что асинхронная операция завершена
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
        });
    };
};
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        todolistsAPI.createTodolist(title).then((res) => {
            dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
        });
    };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(todolistsActions.changeTodolistTitle({ todolistId: id, title }));
        });
    };
};

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
