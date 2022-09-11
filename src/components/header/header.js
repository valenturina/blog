import React from 'react';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom'
import Container from '../container'
import style from './header.module.css'

const Header = () => {
    return (
        <header className={style.header}>
            <Container>
                <div className={style.wrapper}>
                    <Link to='articles' style={{textDecoration: 'none', display: 'block', marginRight: 'auto'}}>
                        <h4 className={style.index}>Realworld blog</h4>
                    </Link>
                    <Link to='sign-in' style={{textDecoration: "none"}}>
                        <Button sx={{textTransform: 'none', color: 'black'}}>Sign in</Button>
                    </Link>
                    <Link to='sign-up' style={{textDecoration: "none"}}>
                        <Button color="success" variant="outlined" sx={{textTransform: 'none'}}>Sign up</Button>
                    </Link>
                </div>
            </Container>
        </header>
    )
}

export default Header;