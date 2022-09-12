import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {useParams, useNavigate} from 'react-router-dom';
import {Box, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArticlePreview from "../article-preview";
import ErrorMessage from "../error-message";
import Spinner from '../spinner'
import style from './article.module.css'
import {fetchSingleArticle} from '../../store/article-slice'



const Article = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();
    const status = useSelector((state) => state.articles.status)

    useEffect(()=> {
        dispatch(fetchSingleArticle({slug}))
    }, [dispatch, slug])

    const goBack = () => navigate(-1)



    console.log(status)
    const article = useSelector((state) => state.articles.singleArticle)

    return (
        <>
            {status === 'loading' && <Spinner/> }
            {status === 'fulfilled' && Object.keys(article).length !== 0 ?
                (<>
                    <div className={style.goback}>
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIosIcon/>}
                            label='Back'
                            onClick={goBack}
                        > Go back</Button>
                    </div>
                    <div className={style.article}>
                        <ArticlePreview article={article} openArticle/>
                        <Box>
                            <div>
                                <ReactMarkdown>
                                    {article.body}
                                </ReactMarkdown>
                            </div>
                        </Box>
                    </div>
                </>)
                : null}



        </>
    )
}

export default Article