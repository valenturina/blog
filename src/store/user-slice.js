import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

    export const fetchCreateUser = createAsyncThunk(
        'user/fetchCreateUser',
        async ({username, email, password}, { rejectWithValue})  => {
            const user = {
                username,
                email,
                password
            }
            const response = await fetch('https://blog.kata.academy/api/users', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: {...user}})
            })

            if (response.ok) {
                const data = await response.json();
                return data
            }
            else {
                return rejectWithValue({
                    status: response.status,
                    statusText: response?.data?.errors?.message || 'Не верные данные. Проверьте заполнение полей!',
                })
            }
        }
    )

    export const fetchLoginUser = createAsyncThunk(
        'user/fetchLoginUser',
        async ({email, password}, {rejectWithValue}) => {
            const response = await fetch('https://blog.kata.academy/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: {email, password}})
            })

            if (response.ok) {
                const data = await response.json();
                return data
            }
            else {
                return rejectWithValue({
                    status: response.status,
                    statusText: response?.data?.errors?.message || 'Неверные логин и/или пароль',
                })
            }
        }
    )

    export const fetchUpdateProfile = createAsyncThunk(
        'user/fetchUpdateProfile',
        async ({email, username, password, image}, {rejectWithValue}) => {
            const response = await fetch('https://blog.kata.academy/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: JSON.stringify({user: {email, username, password, image}})
            })

            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                return rejectWithValue({
                    status: response.status,
                    statusText:
                        response?.data?.errors?.message || 'Не удалось обновить данные',
                });
            }
        }
    )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: JSON.parse(localStorage.getItem('user')).username || '',
        email: JSON.parse(localStorage.getItem('user')).email || '',
        bio: JSON.parse(localStorage.getItem('user')).bio || '',
        image: JSON.parse(localStorage.getItem('user')).image || '',
        userStatus: null,
        userError: null,
        userIsEdit: false
    },
    reducers: {
        logOut(state) {
            state.username = '';
            state.email = '';
            state.bio = '';
            state.image = '';
            state.userStatus = '';
            localStorage.removeItem('user')
        },
        resetUserError(state) {
            state.userError = null
        },
        setUserNotEdit(state) {
            state.userIsEdit = false
        }
    },
    extraReducers: {
        //fetchCreateUser
        [fetchCreateUser.pending]: (state)=> {
            state.userStatus = 'pending';
            state.userIsEdit = false;
            state.userError = false
        },
        [fetchCreateUser.fulfilled]: (state, action)=> {
            state.userStatus = 'fulfilled';
            state.userIsEdit = true;
            state.userError = false;
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            const localStorageUser = {
                username: action.payload.user.username,
                email: action.payload.user.email,
                token: action.payload.user.token
            }
            localStorage.setItem('user', JSON.stringify(localStorageUser))
        },
        [fetchCreateUser.rejected]: (state, action)=> {
            console.log('sign up error')
            console.log(action.payload)
            state.userStatus = 'error';
            state.userError = action.payload;
            state.userIsEdit = false
        },
        //fetchLoginUser
        [fetchLoginUser.pending]: (state) => {
            state.userStatus = 'pending';
            state.userError = false
        },
        [fetchLoginUser.fulfilled]: (state, action) => {
            state.userError = false;
            state.userStatus = 'fulfilled';
            state.userIsEdit = 'true';
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.bio = action.payload.user.bio;
            state.image = action.payload.user.image;
            const localStorageUser = {
                username: action.payload.user.username,
                email: action.payload.user.email,
                image: action.payload.user.image,
                token: action.payload.user.token
            }
            localStorage.setItem('user', JSON.stringify(localStorageUser))
        },
        [fetchLoginUser.rejected]: (state, action) => {
            console.log('login error')
            console.log(action.payload)
            state.userError = action.payload;
            state.userStatus = 'error';
            state.userIsEdit = false
        },
        //fetchUpdateProfile
        [fetchUpdateProfile.pending]: (state)=> {
            state.userStatus = 'pending';
            state.userError = false
        },
        [fetchUpdateProfile.fulfilled]: (state, action)=> {
            console.log('update success')
            state.userError = false
            state.userStatus = 'fulfilled'
            state.userIsEdit = true
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.bio = action.payload.user.bio;
            state.image = action.payload.user.image;
            localStorage.setItem('user', JSON.stringify({
                username: action.payload.user.username,
                email: action.payload.user.email,
                image: action.payload.user.image,
                token: action.payload.user.token
            }))
        },
        [fetchUpdateProfile.rejected]: (state, action)=> {
            console.log('update error')
            state.userStatus = 'error'
            state.userError = action.payload
            state.userIsEdit = false
        },
    }
})

export const {logOut, resetUserError, setUserNotEdit} = userSlice.actions;

export default userSlice.reducer;