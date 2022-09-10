import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {useParams} from 'react-router-dom'
import {Box} from '@mui/material';
import ArticlePreview from "../article-preview";
import ErrorMessage from "../error-message";
import Spinner from '../spinner'
import style from './article.module.css'
import {fetchSingleArticle} from '../../store/article-slice'



const Article = () => {
    const dispatch = useDispatch();
    const {slug} = useParams();
    const status = useSelector((state) => state.articles.status)

    useEffect(()=> {
        dispatch(fetchSingleArticle({slug}))
    }, [dispatch, slug])


    console.log(status)
    const article = useSelector((state) => state.articles.singleArticle)

    return (
        <>
            {status === 'loading' && <Spinner/> }
            <div className={style.article}>
                {status === 'fulfilled' && Object.keys(article).length !== 0 ?
                    <>
                        <ArticlePreview article={article}/>
                        <Box>
                            <div>
                                <ReactMarkdown>
                                    {article.body}
                                </ReactMarkdown>
                            </div>
                        </Box>
                    </>
                : <Spinner/>}

            </div>


        </>
    )
}

export default Article