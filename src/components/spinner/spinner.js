import React from 'react';
import {Stack, CircularProgress} from "@mui/material";

const Spinner = () => {
    return (
        <Stack alignItems="center" sx={{ display: 'flex' }}>
            <CircularProgress/>
        </Stack>
    )
}

export default Spinner