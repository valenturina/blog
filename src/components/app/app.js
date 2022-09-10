import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import Article from "../article";
import ArticleList from "../article-list";
import Layout from '../layout'


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Navigate  to="articles" replace />}/>
                <Route path='articles' element={<ArticleList/>} />
                <Route path='articles/:slug' element={<Article/>}/>
            </Route>
        </Routes>
    )
}

export default App;