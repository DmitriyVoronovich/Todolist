import React from 'react';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";

export const ButtonAppBar = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <Menu/>
                </IconButton>
                <Typography variant='h6'>
                    Todolist
                </Typography>
            </Toolbar>
        </AppBar>
    );
};