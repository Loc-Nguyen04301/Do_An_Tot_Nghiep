import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types';
import { isLogin, setAccessToken, setLoginTrue, setRefreshToken } from '../utils';
import AuthService from '../services/AuthService';


// Define a type for the slice state
interface AuthState {
    access_token: string;
    refresh_token: string;
    user: IUser
}

const initialState: AuthState = {
    access_token: "",
    refresh_token: "",
    user: {
        avatar: "",
        email: "",
        username: ""
    }
}

export const getAccount = createAsyncThunk('auth/getAccount', async () => {
    const logged = isLogin()
    if (logged !== "true") return

    const response = await AuthService.refreshToken()
    console.log(response);
    return response.data.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            const { access_token, refresh_token } = action.payload
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            setLoginTrue()
            return { ...action.payload }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccount.fulfilled, (state, action: PayloadAction<AuthState>) => {
            if (action.payload) {
                const { access_token, refresh_token } = action.payload
                setAccessToken(access_token)
                setRefreshToken(refresh_token)
                setLoginTrue()
                return { ...action.payload }
            }
        })
        builder.addCase(getAccount.rejected, () => {
            return
        })
        builder.addCase(getAccount.pending, () => {
            return
        })
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer
