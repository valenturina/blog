import React from 'react';
import {Box, Button, Paper, TextField, Divider, FormControlLabel, Checkbox} from "@mui/material";
import {Link} from 'react-router-dom';
import style from './sign-up.module.css'

const SignUpForm = () => {
    return(
        <Box
            sx={{
                m: 'auto',
                maxWidth: 384
            }}>
            <form>
                <Paper
                    sx={{
                        p: 5
                    }}>

                    <div className={style.titleBox}>
                        <h3 className={style.title}>Create new account</h3>
                    </div>

                    <TextField
                        label='Username'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        label='Email address'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        label='Password'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        label='Repeat password'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <Divider
                    sx={{
                        mb: 1
                    }}/>
                    <FormControlLabel
                        control={<Checkbox/>}
                        label=' I agree to the processing of my personal information'

                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            mb: 2
                        }}
                    >Create</Button>

                    <div className={style.signinCheck}>
                        <span>Already have an account? </span>
                        <Link to='/sign-in' style={{textDecoration: 'none'}}>Sign in</Link>
                    </div>
                </Paper>
            </form>
        </Box>
    )
}

export default SignUpForm;