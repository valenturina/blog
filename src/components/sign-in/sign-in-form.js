import React from "react";
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {Box, Paper, TextField, Button} from '@mui/material';
import style from './sign-in.module.css'

const SignInForm = ({handleLogIn}) => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onChange'
    })



    const onFormSubmit = (data) => {
        handleLogIn({...data})
    }

    return(
        <Box
            sx={{
                m: 'auto',
                maxWidth: 384
            }}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        id='email'
                        {...register('email', {
                            required: 'Введите корректный почтовый адрес',
                            pattern: {
                                message: 'Введите корректный почтовый адрес',
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                            }
                        })}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />

                    <span>Password</span>
                    <TextField
                        {...register('password',{
                            required: 'Введите пароль',
                            minLength: {
                                value: 6,
                                message: 'Пароль не может быть меньше 6 символов'
                            }
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type="password"
                        id='password'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!isValid}
                        sx={{
                            mb: 1,
                        }}>
                        Login
                    </Button>
                    <div className={style.signUpCheck}>
                        <span>Don't have an account? </span>
                        <Link to='/sign-up' style={{textDecoration: 'none', color: '#1565c0'}}>Sign up</Link>
                    </div>
                </Paper>
            </form>
        </Box>
    )
}

export default SignInForm