import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types';
import { removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '../utils';
import AuthService from '../services/AuthService';

interface AuthState {
    access_token: string;
    refresh_token: string;
    user: IUser
}

const initialState: AuthState = {
    access_token: "",
    refresh_token: "",
    user: {
        id: null,
        avatar: "",
        email: "",
        username: ""
    }
}

export const getAccount = createAsyncThunk('auth/getAccount', async () => {
    try {
        const response = await AuthService.refreshToken()
        return response?.data.data
    } catch (error) {
        console.log(error)
    }
})

export const logOut = createAsyncThunk('auth/logOut', async () => {
    try {
        const res = await AuthService.logout()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            const { access_token, refresh_token } = action.payload
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            return { ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccount.fulfilled, (state, action: PayloadAction<AuthState>) => {
            if (action.payload) {
                const { access_token, refresh_token } = action.payload
                setAccessToken(access_token)
                setRefreshToken(refresh_token)
                return { ...action.payload }
            }
        })
        builder.addCase(getAccount.rejected, () => {
            removeAccessToken()
            removeRefreshToken()
            return { ...initialState }
        })
        builder.addCase(getAccount.pending, () => {
            return
        })
        builder.addCase(logOut.fulfilled, (state) => {
            removeAccessToken()
            removeRefreshToken()
            return { ...initialState }
        })
        builder.addCase(logOut.rejected, () => {
            return
        })
        builder.addCase(logOut.pending, () => {
            return
        })
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer
