import React from 'react';
import {Button} from '@mui/material';
import Container from '../container'
import style from './header.module.css'

const Header = () => {
    return (
        <header className={style.header}>
            <Container>
                <div className={style.wrapper}>
                    <h4 className={style.index}>Realworld blog</h4>
                    <Button sx={{textTransform: 'none', color: 'black'}}>Sign in</Button>
                    <Button color="success" variant="outlined" sx={{textTransform: 'none'}}>Sign up</Button>
                </div>
            </Container>
        </header>
    )
}

export default Header;