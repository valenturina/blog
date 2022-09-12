import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import {Box, Paper, Button, TextField, Divider} from "@mui/material";

const ArticleForm = ({onCreate}) => {

    const [tags, setTags] = useState([])
    const [tagValue, setTagValue] = useState('')

    const handleAddTag = () => {
        setTags([...tags, tagValue]);
        setTagValue('')
    }
    const handleDeleteTag = (id) => {
        setTags(tags.filter((_, index) => index !== id))
    }
    return (
        <Box sx={{width: '938px'}}>
            <form>
                <Paper sx={{
                    py: 5,
                    px: 4
                    }}
                >
                    <h4 style={{textAlign: 'center', marginBottom: "20px"}}>{onCreate? 'Create new article' : 'Edit Article'}</h4>
                    <div>Title</div>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                    />
                    <div>Short description</div>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                    />
                    <div>Text</div>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        minRows={6}
                        multiline
                        required
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                    />
                    <div>Tags</div>
                    <TextField
                        variant="outlined"
                        size="small"
                        required
                        value={tagValue}
                        id='tag'
                        sx={{
                            my: 1
                        }}
                        onChange={(event) => {
                            setTagValue(event.target.value);
                        }}
                    />
                    <Button
                        variant="outlined"
                        sx={{
                            m: 1,
                            textTransform: 'none',
                        }}
                        onClick={handleAddTag}
                    >Add tag</Button>

                    {tags && (
                        tags.map((tag, id) => (
                            <Box key={tag+id} sx={{mb: 2, mt: 1}}>
                                <TextField disabled id={tag} value={tag} size='small' sx={{ mr: 1,  }}/>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                    onClick={() => handleDeleteTag(id)}
                                >
                                    Delete tag
                                </Button>
                            </Box>
                        ))
                    )}
 
                    <Divider sx={{ mb: 2, mt: 1 }} />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mb: 2,
                            textTransform: 'none',
                            width: '50%',
                        }}>Send</Button>
                </Paper>
            </form>
        </Box>
    )
}

export default ArticleForm;