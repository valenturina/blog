import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Box, TextField, Paper, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchUpdateProfile, setUserNotEdit} from '../../store/user-slice'
import {useLocation, useNavigate} from "react-router-dom";


const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userStatus = useSelector(state => state.user.userStatus)
    const userIsEdit = useSelector(state=> state.user.userIsEdit)
    const errorResponse = useSelector(state => state.user.userError)

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(()=> {
        if(userStatus==='fulfilled' && userIsEdit) {
            navigate(fromPage, { replace: true });
            dispatch(setUserNotEdit())
        }
    }, [dispatch, navigate, fromPage, userIsEdit, userStatus])

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
        dispatch(fetchUpdateProfile(data))
    }

    return (
        <Box sx={{width: '384px'}}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Paper sx={{
                    py: 4,
                    px: 3
                }}>
                    <h5 style={{fontSize: '20px', textAlign: 'center', fontWeight: 'normal'}}>Edit profile</h5>

                    <p>Username</p>
                    <TextField
                        {...register('username', {
                                required: 'Имя пользователя не может быть пустым',
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
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>Email address</p>
                    <TextField
                        {...register('email', {
                            required: "Email не может быть пустым",
                            pattern: {
                                message: "Введите корректный почтовый адрес",
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                            }
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>New Passwords</p>
                    <TextField
                        {...register('password', {
                            required: 'Введите новый пароль',
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
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />
                    <p>Avatar image (url)</p>
                    <TextField
                        {...register('image', {
                            required: 'Введите ссылку на изображение',
                            pattern: {
                                message: 'Введите корректный URL',
                                value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                            }
                        })}
                        error={!!errors?.image}
                        helperText={errors?.image?.message}
                        variant='outlined'
                        size='small'
                        fullWidth
                        sx={{mb: 3, mt: 1}}
                    />

                    <Button
                        type='submit'
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