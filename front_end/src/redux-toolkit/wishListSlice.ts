import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IProductWishList {
    id: number
    image: string
    name: string
    old_price: number
    new_price: number
    available: number
}

export interface WishListState {
    wishList: IProductWishList[],
    totalProduct: 0
}

const initialState: WishListState = {
    wishList: [],
    totalProduct: 0
}

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addProductToWishList: (state, action: PayloadAction<IProductWishList>) => {
            const existingItemIndex = state.wishList.findIndex((item) => item.id === action.payload.id)
            if (existingItemIndex === -1) {
                state.wishList.push({ ...action.payload })
                state.totalProduct += 1
            }
        },
        removeProductToWishList: (state, action: PayloadAction<{ id: number }>) => {
            const existingItemIndex = state.wishList.findIndex((item) => item.id === action.payload.id)
            if (existingItemIndex !== -1) {
                state.wishList = state.wishList.filter((item) => item.id !== action.payload.id)
                state.totalProduct -= 1
            }
        }
    }
})

export const { addProductToWishList, removeProductToWishList } = wishListSlice.actions

export default wishListSlice.reducer