import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignInForm from "./sign-in-form";
import ErrorMessage from "../error-message";
import {fetchLoginUser,setUserNotEdit} from '../../store/user-slice'

const SignInPage = () => {
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

    const handleLogIn = (data) => {
        dispatch(fetchLoginUser(data))
    }
    return (
        <div style={{marginTop: '20px'}}>
            <SignInForm handleLogIn={handleLogIn}/>
            {errorResponse && <ErrorMessage errorResponse={errorResponse}/>}
        </div>
    )
}

export default SignInPage