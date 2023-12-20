import React, {memo, useCallback} from "react";
import {FilterType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import IconButton from "@mui/material/IconButton";

import Delete from "@mui/icons-material/Delete";
import {CheckboxComp} from "../components/Checkbox";
import {TaskStateType, TodolistType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTask, changeTaskStatus, changeTaskTitleValue, removeTask} from "../reducers/tasksReducer";
import {changeFilter, changeTodolistTitle, removeTodolist} from "../reducers/todolistReducer";
import {FilterButton} from "../components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolist: TodolistType
}

export const Todolist = memo((props: TodolistPropsType) => {
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const {todolist} = props;

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

    const addedTask = useCallback((title: string) => {
        dispatch(addTask(todolist.id, title));
    }, [dispatch]);

    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitle(todolist.id, title));
    }, []);

    const onChangeTaskTitle = useCallback((id: string, title: string) => {
        dispatch(changeTaskTitleValue(todolist.id, id, title));
    }, []);

    const onAllClickHandler = () => {
        dispatch(changeFilter(todolist.id, FilterType.ALL));
    };

    const onActiveClickHandler = () => {
        dispatch(changeFilter(todolist.id, FilterType.ACTIVE));
    };

    const onCompletedClickHandler = () => {
        dispatch(changeFilter(todolist.id, FilterType.COMPLETED));
    };

    const onTodolistDelete = useCallback(() => dispatch(removeTodolist(todolist.id)), []);

    const callBackHandler = useCallback((id: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatus(todolist.id, id, newIsDoneValue));
    }, []);

    const task = filteredTasks(todolist.filter).map((item) => {

        return (
            <li key={item.id}>
                <CheckboxComp callBack={(newIsDoneValue) => callBackHandler(item.id, newIsDoneValue)}
                              isDone={item.isDone}/>
                <EditableSpan value={item.title} onChange={(title) => onChangeTaskTitle(item.id, title)}/>
                <IconButton onClick={() => dispatch(removeTask(todolist.id, item.id))}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan value={todolist.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={onTodolistDelete}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addedTask}/>
            <ul>
                {task}
            </ul>
            <div>
                <FilterButton callback={onAllClickHandler}
                              variant={todolist.filter === FilterType.ALL ? 'outlined' : 'contained'}
                              name={'All'}/>
                <FilterButton callback={onActiveClickHandler}
                              variant={todolist.filter === FilterType.ACTIVE ? 'outlined' : 'contained'}
                              name={'Active'}/>
                <FilterButton callback={onCompletedClickHandler}
                              variant={todolist.filter === FilterType.COMPLETED ? 'outlined' : 'contained'}
                              name={'Completed'}/>
            </div>
        </div>
    )
});