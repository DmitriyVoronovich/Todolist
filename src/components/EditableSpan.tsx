import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

export type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    return editMode
        ? <TextField variant='outlined'
                     value={title}
                     size='small'
                     onBlur={activateViewMode}
                     onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};