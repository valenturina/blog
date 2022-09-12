import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from "./sign-up-form";

const SignUpPage = () => {


    const handleSignUp = () => {

    }
    return(
        <div>
            <SignUpForm handleSignUp={handleSignUp}/>
        </div>
    )
}

export default SignUpPage;