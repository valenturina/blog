import React, {useState} from 'react';
import style from './article-preview.module.css'
import {Checkbox, Chip, Avatar} from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const ArticlePreview = ({article}) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className={style.preview}>
            <div className={style.text}>
                <header>
                    <div className={style.headerInfo}>
                        <h3 className={style.title}>{article.title}</h3>
                        <Checkbox
                            sx={{p: 0}}
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite sx={{ color: 'red' }} />}
                            disabled={true}
                            checked={checked}
                            onClick={()=> {setChecked(!checked)}}
                        />
                        <span className={style.count}>{article.favoritesCount}</span>
                    </div>
                    <div>
                        {article.tagList.map((tag)=> (
                            tag && <Chip label={tag} variant="outlined" size="small" sx={{borderRadius: 2}}/>
                        ))}
                    </div>
                </header>
                <div className={style.description}>
                    <p> {article.description}</p>
                </div>
            </div>
            <div className={style.profile}>
                <div className={style.nameInfo}>
                    <div className={style.name}>{article.author.username}</div>
                    <div className={style.date}>sep 8, 2022</div>
                </div>
                <div className={style.avatar}>
                    <Avatar>A</Avatar>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview;