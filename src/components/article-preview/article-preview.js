import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import style from './article-preview.module.css'
import {Checkbox, Chip, Avatar, Button} from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import avatar from '../../assets/avatar.png';
import {parseISO, format} from 'date-fns'
import {useSelector, useDispatch} from "react-redux";
import ModalWindow from "../modal-window/modal-window";
import Spinner from '../spinner'
import {fetchDeleteArticle, fetchUnfavArticle, fetchFavArticle} from '../../store/article-slice'

const ArticlePreview = ({article, openArticle}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [fav, setFav] = useState(article?.favorited || false);
    const [modalOpen, setModalOpen] = useState(false)
    const [favCount, setFavCount] = useState(article.favoritesCount);

    const userLogged = useSelector(state => state.user.username)
    const auth = useSelector(state => state.user.email);
    const uniqKey = () => {
        return Date.now() + Math.random() * 10;
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const handleDeleteArticle = () => {
        dispatch(fetchDeleteArticle(article.slug))
        setModalOpen(false)
        navigate('/', {replace: true})
    }

    const handleFavClick = (event) => {
        const slug = article.slug
        if (event.target.checked) {
            console.log(article.slug)
            console.log('trying to fav')
            dispatch(fetchFavArticle(slug))
            setFav(true)
            setFavCount(favCount + 1)
        } else {
            dispatch(fetchUnfavArticle(slug))
            setFav(false)
            setFavCount(favCount - 1)
        }
    }
    const isAuthor = userLogged === article.author.username

    return (

        <div className={style.preview}>
            <div className={style.text}>
                <header>
                    <div className={style.headerInfo}>
                        {!openArticle
                            ? <Link to={`${article.slug}`} style={{ textDecoration: 'none' }}>
                                <h3 className={style.title}>{article.title}</h3>
                              </Link>
                        : <h3 className={style.title}>{article.title}</h3>}

                        <Checkbox
                            sx={{p: 0}}
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite sx={{ color: 'red' }} />}
                            disabled={!userLogged}
                            checked={fav}
                            onClick={(event)=> {handleFavClick(event)}}
                        />
                        <span className={style.count}>{favCount}</span>
                    </div>
                    <div>
                        {article.tagList.map((tag)=> (
                            tag && <Chip key={uniqKey()} label={tag} variant="outlined" size="small" sx={{borderRadius: 2, mr: 1}}/>
                        ))}
                    </div>
                </header>
                <div className={style.description}>
                    <p> {article.description}</p>
                </div>
            </div>
            <div className={style.profile}>
                <div className={style.profileBlock}>
                    <div className={style.nameInfo}>
                        <div className={style.name}>{article.author.username}</div>
                        <div className={style.date}>{format(parseISO(article.createdAt), 'MMMM dd, yyyy')}</div>
                    </div>
                    <div className={style.avatar}>
                        <Avatar alt="Avatar" src={article.author.image || avatar} sx={{width: 46, height: 46}}></Avatar>
                    </div>
                </div>
                {openArticle && isAuthor && (
                    <div className={style.btnBlock}>
                        <Button
                            color="error"
                            variant="outlined"
                            sx={{ textTransform: 'none', mr: 3 }}
                            onClick={()=> setModalOpen(true)}
                        >Delete</Button>
                        <Link to="edit" style={{ textDecoration: 'none' }}>
                            <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>Edit</Button>
                        </Link>
                    </div>
                )}
            </div>
            <ModalWindow modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleDeleteArticle={handleDeleteArticle}/>
        </div>


    )
}

export default ArticlePreview;