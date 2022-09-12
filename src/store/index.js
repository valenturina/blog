import {configureStore} from '@reduxjs/toolkit';
import articleSlice from './article-slice';
import userSlice from "./user-slice";

export const store = configureStore({
    reducer: {
        articles: articleSlice,
        user: userSlice
    }
})

