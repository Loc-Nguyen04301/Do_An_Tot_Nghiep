import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ProductService from '../services/ProductService'

interface Category {
    name: string;
}
export interface IProductDetail {
    id: number
    name: string
    brand: string
    old_price: number
    new_price: number
    image: string
    available: number
    averageRating: number
    categories: { category: Category }[]
}

const initialState: IProductDetail[] = []

export const retrieveProducts = createAsyncThunk(
    "product/retrieve",
    async () => {
        const res = await ProductService.getAll();
        return res.data.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async ({ id }: { id: number }) => {
        await ProductService.removeProduct(id);
        return { id };
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveProducts.fulfilled, (state, action: PayloadAction<IProductDetail[]>) => {
            return [...action.payload];
        }),
            builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
                let index = state.findIndex(({ id }) => id === action.payload.id);
                state.splice(index, 1);
            })
    }
})

export default productSlice.reducer
