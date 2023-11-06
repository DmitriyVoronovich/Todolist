import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './../App.css'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm:React.FC <AddItemFormPropsType> = (props) => {
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
                <input value={title} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} className={error ? 'error' : ''}/>
                <button onClick={addItem}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
};
