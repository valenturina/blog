import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from "./sign-up-form";
import {fetchCreateUser, setUserNotEdit} from '../../store/user-slice'

const SignUpPage = () => {
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

    const handleSignUp = (data) => {
        dispatch(fetchCreateUser(data))
    }
    return(
        <div>
            <SignUpForm handleSignUp={handleSignUp}/>
        </div>
    )
}

export default SignUpPage;