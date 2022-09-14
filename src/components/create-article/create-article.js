import React, {useEffect} from 'react';
import ArticleForm from "../article-form";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCreateArticle} from '../../store/article-slice'


const CreateArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
     const articleStatus = useSelector(state => state.articles.status)
     const articleCreated = useSelector(state=> state.articles.articleIsCreated)
    // const errorResponse = useSelector(state => state.articles.error)

    useEffect(()=> {
        if(articleStatus === 'fulfilled' && articleCreated) {
            navigate(fromPage, {replace: true})
        }
    }, [articleCreated, articleStatus, navigate, fromPage])

    const handleFormSubmit = (data, tags) => {
        dispatch(fetchCreateArticle({...data, tagList: tags}))
    }

    return (
        <div>
            <ArticleForm onCreate handleFormSubmit={handleFormSubmit}/>
        </div>
    )
}

export default CreateArticle;