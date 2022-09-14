import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Container from '../container'
import style from './header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Button, Avatar} from "@mui/material";
import {logOut, fetchGetCurrentUser} from '../../store/user-slice'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state =>  state.user.email);
    const user = useSelector(state => state.user.username);
    const avatar = useSelector(state => state.user.image);
    const token = localStorage.getItem('token')

    useEffect(()=> {
        if (token) {
            dispatch(fetchGetCurrentUser(token))
        }
    }, [token, dispatch])

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/', {replace: true})
    }

    return (
        <header className={style.header}>
            <Container>
                <div className={style.wrapper}>
                    <Link to='articles' style={{textDecoration: 'none', display: 'block', marginRight: 'auto'}}>
                        <h4 className={style.index}>Realworld blog</h4>
                    </Link>
                    {auth
                        ?
                        (<>
                            <Link style={{ textDecoration: 'none' }} to='new-article'>
                                <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>Create article</Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='profile'>
                                <div className={style.profile}>
                                    <span className={style.username}>{user}</span>
                                    <Avatar src={avatar} alt='Avatar' sx={{ width: 46, height: 46 }} />
                                </div>

                            </Link>
                            <div>
                                <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }} onClick={handleLogOut} > Log out </Button>
                            </div>
                        </>)
                        :
                        (<>

                        <Link to='sign-in' style={{textDecoration: "none"}}>
                            <Button sx={{textTransform: 'none', color: 'black'}}>Sign in</Button>
                        </Link>
                        <Link to='sign-up' style={{textDecoration: "none"}}>
                            <Button color="success" variant="outlined" sx={{textTransform: 'none'}} >Sign up</Button>
                        </Link>
                        </>)
                    }

                </div>
            </Container>
        </header>
    )
}

export default Header;