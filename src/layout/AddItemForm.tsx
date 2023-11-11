import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './../App.css'
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent) => {
        setError(null);
        if (event.key === 'Enter') {
            addItem();
        }
    };

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       error={!!error}
                       variant='outlined'
                       label='Title'
                       helperText={error}/>
            <IconButton color='primary'
                        onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
};
