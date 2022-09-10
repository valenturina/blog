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

    console.log('slug is ' + slug)

    useEffect(()=> {
        dispatch(fetchSingleArticle({slug}))
    }, [dispatch, slug])

    const article = useSelector(state => state.articles.singleArticle)
    const status = useSelector(state => state.articles.status)
    console.log('article ')
    console.log(article)

    return (

        <div className={style.article}>
            {status === 'loading' && <Spinner/> }
            {status === 'fulfilled' &&
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
            }

        </div>
    )
}

export default Article