import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {Alert, Snackbar} from '@mui/material';
import {resetUserError} from '../../store/user-slice'


const ErrorMessage = ({errorResponse}) => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        if (errorResponse.status===404){
            dispatch(resetUserError())
            navigate('/notFound', {replace: true})
        }
    })

    const closeAlert = ()=> {
        setOpen(false);
        dispatch(resetUserError())
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
            <Alert severity="error" sx={{ width: '100%' }}>
                Произошла ошибка.
            </Alert>
        </Snackbar>

    )
}

export default ErrorMessage