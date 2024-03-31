import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'
import authReducer from "./authSlice"
import cartReducer, { CartState } from "./cartSlice"
import { combineReducers } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
    ...persistConfig,
    key: 'cart',
}

const rootReducer = combineReducers({
    cart: persistReducer<CartState>(cartPersistConfig, cartReducer),
    auth: authReducer,
})

export default rootReducer