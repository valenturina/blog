import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Article from "../article";
import ArticleList from "../article-list";
import Layout from '../layout'
import SignInPage from "../sign-in/sign-in-page";
import SignUpPage from "../sign-up/sign-up-page";


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate  to="articles" replace />}/>
                <Route path='articles' element={<ArticleList/>} />
                <Route path='articles/:slug' element={<Article/>}/>
                <Route path='sign-in' element={<SignInPage/>}/>
                <Route path='sign-up' element={<SignUpPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;