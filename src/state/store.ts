import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store