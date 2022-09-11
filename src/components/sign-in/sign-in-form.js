import React from "react";
import {Link} from 'react-router-dom';
import {Box, Paper, TextField, Button} from '@mui/material';
import style from './sign-in.module.css'

const SignInForm = () => {
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
                    }}
                >
                    <div className={style.titleBox}>
                        <h3 className={style.title}>Sign in</h3>
                    </div>

                    <span>E-mail</span>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />

                    <span>Password</span>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mb: 1,
                        }}>
                        Login
                    </Button>
                    <div className={style.signUpCheck}>
                        <span>Don't have an account? </span>
                        <Link to='/sign-up' style={{textDecoration: 'none'}}>Sign up</Link>
                    </div>
                </Paper>
            </form>
        </Box>
    )
}

export default SignInForm