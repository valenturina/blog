import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignInForm from "./sign-in-form";

const SignInPage = () => {

    const handleLogIn = () => {

    }
    return (
        <div style={{marginTop: '20px'}}>
            <SignInForm handleLogIn={handleLogIn}/>
        </div>
    )
}

export default SignInPage