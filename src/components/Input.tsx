import React, {ChangeEvent} from 'react';

type InputPropsType = {
    newTask: string
    callback:(event: ChangeEvent<HTMLInputElement>) => void
}
export const Input = (props: InputPropsType) => {

    return (
        <input value={props.newTask} onChange={props.callback}/>
    );
};