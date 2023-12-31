import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolistReducer";


type TasksReducerType =
    AddTaskType
    | RemoveTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleValueType
    | AddTodolistType
    | RemoveTodolistType;

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: TasksReducerType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const todolistId = action.payload.todolistId
            const task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [todolistId]: [task, ...state[todolistId]]}
        }
        case "REMOVE-TASK": {
            const todolistId = action.payload.todolistId
            return {...state, [todolistId]: state[todolistId]
                    .filter(item => item.id !== action.payload.id)}
        }
        case "CHANGE-TASK-STATUS": {
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId]
                    .map(item => item.id === action.payload.id ? {...item, isDone: action.payload.isDone} : item)
            }
        }
        case "CHANGE-TASK-TITLE-VALUE": {
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId]
                    .map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const {[action.payload.todolistId]: [], ...rest} = state
            return rest
        }
        default:
            return state
    }
};

type AddTaskType = ReturnType<typeof addTask>;

export const addTask = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
};

type RemoveTaskType = ReturnType<typeof removeTask>;

export const removeTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
};

type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>

export const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            isDone
        }
    } as const
};

type ChangeTaskTitleValueType = ReturnType<typeof changeTaskTitleValue>

export const changeTaskTitleValue = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE-VALUE',
        payload: {
            todolistId,
            id,
            title
        }
    } as const
};