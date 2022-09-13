import React from 'react';
import {useForm} from "react-hook-form";
import {Box, Button, Paper, TextField, Divider, FormControlLabel, Checkbox} from "@mui/material";
import {Link} from 'react-router-dom';
import style from './sign-up.module.css'

const SignUpForm = ({handleSignUp}) => {
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        watch
    } = useForm({
        mode: "onBlur",
    })

    const onFormSubmit = (data) => {
        handleSignUp({...data})
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
                    }}>

                    <div className={style.titleBox}>
                        <h3 className={style.title}>Create new account</h3>
                    </div>

                    <TextField
                        {...register('username', {
                            required: 'Введите имя пользователя (от 3 до 20 символов включительно)',
                            minLength: {
                                value: 3,
                                message: 'Имя пользователя должно  быть не меньше 3 символов'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Имя пользователя должно  быть не больше 20 символов'
                            }
                            },
                        )}
                        error={!!errors?.username}
                        helperText={errors?.username?.message}
                        label='Username'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        {...register('email', {
                            required: "Введите корректный почтовый адрес",
                            pattern: {
                                message: "Введите корректный почтовый адрес",
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                            }
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                        label='Email address'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        {...register('password', {
                            required: 'Введите пароль',
                            minLength: {
                                value: 6,
                                message: 'Пароль должен быть не меньше 6 символов'
                            },
                            maxLength: {
                                value: 40,
                                message: 'Пароль должен быть не больше 40 символов'
                            }
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type='password'
                        label='Password'
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{mb: 2, mt: 1}}
                    />
                    <TextField
                        {...register('confirmPassword', {
                            required: 'Повторите пароль',
                            validate: value => {
                                if (watch('password') !== value) {
                                    return 'Пароли должны совпадать'
                                }
                            }
                        })}
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                        type='password'
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
                        control={<Checkbox {...register('acceptPersonalInf', {
                            required: 'Подтвердите согласие на обработку персональных данных'
                                           })}/>}
                        label=' I agree to the processing of my personal information'
                    />
                    {!!errors?.acceptPersonalInf && (
                        <span className={style.personalInfo}>
                            {errors?.acceptPersonalInf?.message}
                        </span>
                    )}

                    <Button
                        type='submit'
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            mb: 2
                        }}
                        disabled={!isValid}
                    >Create</Button>

                    <div className={style.signinCheck}>
                        <span>Already have an account? </span>
                        <Link to='/sign-in' style={{textDecoration: 'none', color: '#1565c0'}}>Sign in</Link>
                    </div>
                </Paper>
            </form>
        </Box>
    )
}

export default SignUpForm;