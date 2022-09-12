import React from 'react';
import {Button, Box} from '@mui/material';
import {Link, useLocation} from 'react-router-dom'
import notFoundPic from '../../assets/not-found.jpg'

const NotFound = ()=> {

    return (
        <Box sx={{
            p: 3,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <p >Whatever you`ve been looking for...</p>
            <div >
                <img src={notFoundPic} alt="not found" />
            </div>
            <div style={{margin: '0 auto'}}>
                <p>It's not there. </p>
                <p>Look somewhere else.</p>
            </div>
            <Link to='/' style={{textDecoration: 'none', margin: '20px auto', alignSelf: 'center'}}>
                <Button
                    variant='contained'
                    sx={{width: '200px',}}
                >Go home</Button>
            </Link>
        </Box>
    )
}

export default NotFound