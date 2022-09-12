import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Article from "../article";
import ArticleList from "../article-list";
import Layout from '../layout'
import SignInPage from "../sign-in/sign-in-page";
import SignUpPage from "../sign-up/sign-up-page";
import CreateArticle from "../create-article";
import EditProfile from "../edit-profile";
import RequireAuth from "../hoc/require-auth";
import NotFound from "../not-found/not-found";


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate  to="articles" replace />}/>
                <Route path='articles' element={<ArticleList/>} />
                <Route path='articles/:slug' element={<Article/>}/>
                <Route path='sign-in' element={<SignInPage/>}/>
                <Route path='sign-up' element={<SignUpPage/>}/>
                <Route
                    path='new-article'
                    element={
                        <RequireAuth>
                            <CreateArticle/>
                        </RequireAuth>
                    }/>
                <Route path='profile' element={<RequireAuth><EditProfile/></RequireAuth>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default App;