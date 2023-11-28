import React, {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox";

type CheckboxPropsType = {
    isDone: boolean
    callBack: (newIsDoneValue: boolean)=> void
}

export const CheckboxComp: React.FC<CheckboxPropsType> = (props) => {
    const {isDone, callBack} = props;
    const onChangeIsDone = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked);
    };

    return (
        <Checkbox checked={isDone}
                  onChange={onChangeIsDone}
                  className={isDone ? 'is-done' : ''}
                  color='primary'/>
    )
}