import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import style from './article-preview.module.css'
import {Checkbox, Chip, Avatar, Button} from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import avatar from '../../assets/avatar.png';
import {parseISO, format} from 'date-fns'
import {useSelector} from "react-redux";

const ArticlePreview = ({article, openArticle}) => {

    const [fav, setFav] = useState(article?.favorited || false);
    const [favCount, setFavCount] = useState(article.favoritesCount);

    const userLogged = useSelector(state => state.user.username)
    const auth = useSelector(state => state.user.email);
    const uniqKey = () => {
        return Date.now() + Math.random() * 10;
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
                            onClick={()=> {setFav(!fav)}}
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
                        <Button color="error" variant="outlined" sx={{ textTransform: 'none', mr: 3 }}>Delete</Button>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>Edit</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticlePreview;