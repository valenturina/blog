import {configureStore} from '@reduxjs/toolkit';
import articleSlice from './article-slice'

export const store = configureStore({
    reducer: {
        articles: articleSlice,
    }
})

