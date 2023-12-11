import {FilterType, TodolistType} from "../App";

type TodolistReducerType =
    ChangeFilterType |
    RemoveTodolistType |
    ChangeTodolistTitleType |
    AddTodolistType;

const initialState: TodolistType[] = [];

export const todolistReducer = (state: TodolistType[] = initialState, action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-FILTER": {
            const todolistId = action.payload.todolistId
            return state.map(item => item.id === todolistId ? {...item, filter: action.payload.value} : item)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(item => item.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            const title = action.payload.title
            return state.map(item => item.id === action.payload.todolistId ? {...item, title} : item)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {id: action.payload.newTodolistId, title: action.payload.title, filter: FilterType.ALL};
            return [newTodolist, ...state];
        }
        default:
            return state;
    }
};

type ChangeFilterType = ReturnType<typeof changeFilter>;

export const changeFilter = (todolistId: string, value: FilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            value
        }
    } as const
};

export type RemoveTodolistType = ReturnType<typeof removeTodolist>;

export const removeTodolist = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
};

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>;

export const changeTodolistTitle = (todolistId: string ,title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title,
            todolistId
        }
    } as const
};

export type AddTodolistType = ReturnType<typeof addTodolist>;

export const addTodolist = (newTodolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId
        }
    } as const
};