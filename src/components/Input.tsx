import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    newTask: string
    callback:(event: ChangeEvent<HTMLInputElement>) => void
    onKeyUp: (event: KeyboardEvent) => void
}
export const Input = (props: InputPropsType) => {

    return (
        <input value={props.newTask} onChange={props.callback} onKeyUp={props.onKeyUp}/>
    );
};