import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import authReducer from "./authSlice"
import cartReducer, { CartState } from "./cartSlice"
import productReducer from "./productSlice"
import billNotiReducer from "./billNotiSlice"
import wishListReducer, { WishListState } from "./wishListSlice"

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
    ...persistConfig,
    key: 'cart',
}

const wishListPersistConfig = {
    ...persistConfig,
    key: 'wishList',
}

const rootReducer = combineReducers({
    cart: persistReducer<CartState>(cartPersistConfig, cartReducer),
    wishList: persistReducer<WishListState>(wishListPersistConfig, wishListReducer),
    auth: authReducer,
    product: productReducer,
    billNoti: billNotiReducer
})

export default rootReducer