import React, {memo} from 'react';
import Button from "@mui/material/Button";

type FilterButtonPropsType = {
    name: string
    callback: () => void
    variant: 'outlined' | 'contained'
}

export const FilterButton:React.FC<FilterButtonPropsType> = memo((props) => {
    const {name, callback, variant} = props;
    return (
        <Button onClick={callback}
                variant={variant}
                color={'primary'}
        >
            {name}
        </Button>
    );
});