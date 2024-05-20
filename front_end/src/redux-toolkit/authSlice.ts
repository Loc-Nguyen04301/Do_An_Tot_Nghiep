import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/types';
import { getAccessToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '@/utils';
import AuthService from '@/services/AuthService';

interface AuthState {
    access_token: string | null
    refresh_token: string | null
    user: IUser | null
    loading: boolean
}

const initialState: AuthState = {
    access_token: null,
    refresh_token: null,
    user: null,
    loading: false,
}

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const token = getAccessToken()
        if (token) {
            const response = await AuthService.getMe()
            return response.data.data
        }
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
        login: (state, action: PayloadAction<any>) => {
            const { access_token, refresh_token } = action.payload
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            return { ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.fulfilled, (state, action: PayloadAction<AuthState>) => {
            if (action.payload?.user) {
                state.user = action.payload.user
            }
            state.loading = false
        })
        builder.addCase(getMe.rejected, (state) => {
            removeAccessToken()
            removeRefreshToken()
            return { ...initialState }
        })
        builder.addCase(getMe.pending, (state) => {
            state.loading = true
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
