import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        userStatus: '',
        userError: ''
    },
    reducers: {},
    extraReducers: {

    }
})

