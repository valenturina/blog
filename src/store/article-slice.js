import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import axios from 'axios';

export const fetchGetArticles = createAsyncThunk(
    'articles/fetchGetArticles',
    async ({limit, offset}, {rejectWithValue}) => {
        const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return rejectWithValue({
                status: response?.status,
                statusText: response?.data?.errors?.message || 'Ошибка при запросе',
            })
        }
    }
)

export const fetchSingleArticle = createAsyncThunk(
    'articles/fetchSingleArticle',
    async ({slug}, {rejectWithValue}) => {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return rejectWithValue(response.status)
        }
    }
)

export const fetchCreateArticle = createAsyncThunk(
    'articles/fetchCreateArticle',
    async ({body, title, description, tagList}, {rejectWithValue})=> {
        const response = fetch('https://blog.kata.academy/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({article: {body, title, description, tagList}})
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }else {
            return rejectWithValue({
                status: response?.status,
                statusText: response?.data?.errors?.message || 'Ошибка при запросе',
            })
        }
    }
)

export const fetchUpdateArticle = createAsyncThunk(
    'articles/fetchUpdateArticle',
    async ({body, title, description, tagList, slug}, {rejectWithValue})=> {
        const response = fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({article: {body, title, description, tagList}})
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }else {
            return rejectWithValue({
                status: response?.status,
                statusText: response?.data?.errors?.message || 'Ошибка при запросе',
            })
        }
    }
)

export const fetchDeleteArticle = createAsyncThunk(
    'articles/fetchDeleteArticle',
    async (slug, {rejectWithValue})=> {
        const response = fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }else {
            return rejectWithValue({
                status: response?.status,
                statusText: response?.data?.errors?.message || 'Ошибка при запросе',
            })
        }
    }
)

export const fetchFavArticle = createAsyncThunk(
    'articles/fetchFavArticle',
    async (slug) => {

        const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        const data = await res.json()
        return data
    }
)

export const fetchUnfavArticle = createAsyncThunk(
    'articles/fetchUnfavArticle',
    async (slug) => {

        const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        const data = await res.json()
        return data
    }
)

export const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        singleArticle: {},
        articlesCount: null,
        status: '',
        error: null,
        articleIsCreated: false
    },
    reducers: {},
    extraReducers: {
        ///fetchGetArticles
        [fetchGetArticles.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchGetArticles.fulfilled]: (state, action) => {
            state.articles = [...action.payload.articles]
            state.articlesCount = action.payload.articlesCount
            state.status = 'fulfilled'
        },
        [fetchGetArticles.rejected]: (state, action) => {
            state.error = action.payload
            state.status = 'error'
        },
        //fetchSingleArticle
        [fetchSingleArticle.pending]: (state) => {
            console.log('fetching article')
            console.log('pending single article')
            state.status = 'loading';
        },
        [fetchSingleArticle.fulfilled]: (state, action) => {
            console.log('fulfilled single article')
            state.singleArticle = {...action.payload.article}
            state.status = 'fulfilled'
        },
        [fetchSingleArticle.rejected]: (state, action) => {
            console.log('fetching article error')
            console.log(action.payload)
            state.error = action.payload
            state.status = 'error'
        },
        //fetchCreateArticle
        [fetchCreateArticle.pending]: (state)=> {
            state.status = 'loading'
            state.error = false
        },
        [fetchCreateArticle.fulfilled]: (state, action)=> {
            console.log('article created')
            state.status = 'fulfilled'
            state.error = false
            state.articleIsCreated = true

        },
        [fetchCreateArticle.rejected]: (state, action)=> {
            console.log('article not created')
            state.error = action.payload
            state.articleIsCreated = false
            state.status = 'error'
        },
        //fetchUpdateArticle
        [fetchUpdateArticle.pending]: (state) => {
            console.log('pending update article')
            state.status = 'loading'
        },
        [fetchUpdateArticle.fulfilled]: (state, action) => {
            console.log('update article success')
            state.status = 'fulfilled'
            state.singleArticle = {...action.payload.article}
            state.articleIsCreated = true
        },
        [fetchUpdateArticle.rejected]: (state, action) => {
            state.error = action.payload
            state.status = 'error'
            state.articleIsCreated = false
        },
        //fetchDeleteArticle
        [fetchDeleteArticle.pending]: (state) => {
            console.log('delete article pending')
            state.status = 'loading'
        },
        [fetchDeleteArticle.fulfilled]: (state, action) => {
            console.log('delete article success')
            state.status = 'fulfilled'
        },
        [fetchDeleteArticle.rejected]: (state, action) => {
            state.error = action.payload
        },
        //fetchFavArticle
        [fetchFavArticle.pending]: (state) => {
            console.log('fetch to fav article')
        },
        [fetchFavArticle.fulfilled]: (state, action) => {
            console.log('article favorited')
            console.log(action.payload)
        },
        [fetchFavArticle.rejected]: (state, action) => {
            console.log('no fav for this shit')
            console.log(action.payload)
            state.error = {...action.payload}
            state.status = 'error'
        },
        //fetchUnfavArticle
        [fetchUnfavArticle.pending]: (state) => {
            console.log('fetch to unfav article')
        },
        [fetchUnfavArticle.fulfilled]: (state, action) => {
            console.log('article unfavorited')
        },
        [fetchUnfavArticle.rejected]: (state, action) => {
            state.error = {...action.payload}
            state.status = 'error'
        },
    }
})

export default articleSlice.reducer;