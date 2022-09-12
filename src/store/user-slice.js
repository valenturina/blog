import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        bio: '',
        image: '',
        userStatus: '',
        userError: '',
        userIsEdit: true
    },
    reducers: {
        logOut(state) {
            state.username = '';
            state.email = '';
            state.bio = '';
            state.image = '';
            state.userStatus = '';
        }
    },
    extraReducers: {

    }
})

export const {logOut} = userSlice.actions;

export default userSlice.reducer;