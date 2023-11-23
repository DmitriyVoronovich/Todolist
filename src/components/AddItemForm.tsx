import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== '') {
            props.callback(title);
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

    const buttonStyled = {
        minWidth:'40px',
        maxWidth:'40px',
        minHeight:'40px',
        maxHeight:'40px',
        marginLeft:'5px'
    }

    return (
        <div>
            <TextField value={title}
                       size="small"
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       error={!!error}
                       variant='outlined'
                       label={error ? error : 'Type text here...'}/>
                <Button style={buttonStyled}
                        onClick={addItem}
                        color='primary'
                        variant='contained'>+</Button>
        </div>
    )
};
