import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../header';
import Container from "../container";

const Layout = () => {
    return (
        <>
            <Header/>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
}

export default Layout