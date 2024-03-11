import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser, LoginInterface } from '../types';
import { useAlertDispatch } from '../contexts/AlertContext';


// Define a type for the slice state
interface AuthState {
    access_token?: string;
    refresh_token?: string;
    user?: IUser
}

const initialState: AuthState = {
    access_token: undefined,
    refresh_token: undefined,
    user: undefined
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            return { ...action.payload }
        }
    },

})

export const { login } = authSlice.actions
export default authSlice.reducer
