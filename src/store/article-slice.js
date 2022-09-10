import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import axios from 'axios';

export const fetchGetArticles = createAsyncThunk(
    'articles/fetchGetArticles',
    async ({limit, offset}, {rejectWithValue}) => {
        const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`)
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return rejectWithValue(response.status)
        }
    }
)

export const fetchSingleArticle = createAsyncThunk(
    'articles/fetchSingleArticle',
    async ({slug}, {rejectWithValue}) => {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return rejectWithValue(response.status)
        }
    }
)

export const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        singleArticle: {},
        articlesCount: null,
        status: '',
        error: null
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
            console.log('pending')
            state.status = 'loading';
        },
        [fetchSingleArticle.fulfilled]: (state, action) => {
            console.log('fulfilled')
            state.singleArticle = {...action.payload.article}
            state.status = 'fulfilled'
        },
        [fetchSingleArticle.rejected]: (state, action) => {
            state.error = action.payload
            state.status = 'error'
        },
    }
})

export default articleSlice.reducer;