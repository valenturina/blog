import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Stack, Paper, Pagination} from "@mui/material";
import ArticlePreview from "../article-preview";
import ErrorMessage from "../error-message";
import Spinner from '../spinner'
import style from './article-list.module.css'

import {fetchGetArticles} from '../../store/article-slice'


const ArticleList = () => {
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);
    const articles = useSelector(state => state.articles.articles)
    const articlesCount = useSelector((state) => state.articles.articlesCount)
    const status = useSelector(state=> state.articles.status)
    const errorResponse = useSelector(state => state.articles.error)

    useEffect(()=> {
        dispatch(fetchGetArticles({limit: 5, offset}))

    }, [dispatch, offset])

    return (
        <div className={style.wrapper}>
            {status === 'error' && <ErrorMessage errorResponse={errorResponse}/>}
            {status === 'loading' && <Spinner/>}
            {status === 'fulfilled' &&
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                    {articles.map((article) => (
                        <Paper sx={{p: 2, width: 938}} key={article.slug}>
                            <ArticlePreview article={article}/>
                        </Paper>
                    ))}

                </Stack>
            }
            {status === 'fulfilled' &&
                <div style={{marginBottom: '10px'}}>
                    <Pagination
                        count={Math.ceil(articlesCount / 5)}
                        page={offset / 5 + 1}
                        shape="rounded"
                        onChange={(_, num) => {
                            setOffset((num - 1) * 5);
                        }}
                        size="small"
                    />
                </div>
            }
        </div>
    )
}

export default ArticleList