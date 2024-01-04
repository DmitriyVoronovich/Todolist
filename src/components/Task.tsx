import React, {useCallback} from 'react';
import {CheckboxComp} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {changeTaskStatus, changeTaskTitleValue, removeTask} from "../reducers/tasksReducer";
import Delete from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import { TodolistType} from "../AppWithRedux";

type TaskPropsType = {
    item: TaskType
    todolist: TodolistType
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {item, todolist} = props;
    const dispatch = useDispatch();

    const callBackHandler = useCallback((id: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatus(todolist.id, id, newIsDoneValue));
    }, []);

    const onChangeTaskTitle = useCallback((id: string, title: string) => {
        dispatch(changeTaskTitleValue(todolist.id, id, title));
    }, []);

    return (
        <li key={item.id}>
            <CheckboxComp callBack={(newIsDoneValue) => callBackHandler(item.id, newIsDoneValue)}
                          isDone={item.isDone}/>
            <EditableSpan value={item.title} onChange={useCallback((title) => onChangeTaskTitle(item.id, title), [])}/>
            <IconButton onClick={() => dispatch(removeTask(todolist.id, item.id))}>
                <Delete/>
            </IconButton>
        </li>
    );
});