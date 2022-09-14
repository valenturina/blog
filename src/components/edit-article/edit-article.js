import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ArticleForm from "../article-form";
import Spinner from "../spinner";
import {useParams, useLocation, useNavigate,} from "react-router-dom";
import {fetchSingleArticle, fetchUpdateArticle} from '../../store/article-slice'


const EditArticle = () => {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=> {
        if (slug) {
            console.log('slug for fetching', slug)
            dispatch(fetchSingleArticle({slug}))
        }
    }, [dispatch, slug])

    const fromPage = location.state?.from?.pathname || '/';
    const article = useSelector(state=> state.articles.singleArticle)
    const articleStatus = useSelector(state => state.articles.status)


    const handleFormSubmit = (data, tags) => {
        dispatch(fetchUpdateArticle({...data, tagList: tags, slug}))
        navigate(fromPage, {replace: true})
    }

    return (
        <div>
            {articleStatus === 'loading' && <Spinner/>}
            {articleStatus === 'fulfilled' && article ? (

                <ArticleForm onCreate={false} article={article} handleFormSubmit={handleFormSubmit}/>
            ): null}

        </div>
    )
}

export default EditArticle