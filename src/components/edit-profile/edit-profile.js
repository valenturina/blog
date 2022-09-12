import React from 'react';
import {Box, TextField, Paper, Button} from "@mui/material";

const EditProfile = () => {
    return (
        <Box sx={{width: '384px'}}>
            <form action="">
                <Paper sx={{
                    py: 4,
                    px: 3
                }}>
                    <h5 style={{fontSize: '20px', textAlign: 'center', fontWeight: 'normal'}}>Edit profile</h5>

                    <p>Username</p>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>Email address</p>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>New Passwords</p>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>Avatar image (url)</p>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />

                    <Button
                        variant='contained'
                        fullWidth
                        sx={{mt: 2}}
                    >Save</Button>
                </Paper>
            </form>
        </Box>
    )
}

export default EditProfile