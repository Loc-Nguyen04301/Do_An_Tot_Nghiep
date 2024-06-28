import { CreateCategoryType } from "@/pages/admin/CategoryAdmin"
import CategoryService from "@/services/CategoryService"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ICategory {
    id: number
    name: string
    path: string
}

export interface CategoryState {
    categoryList: ICategory[]
}

const initialState: CategoryState = {
    categoryList: []
}

export const retrieveCategory = createAsyncThunk(
    "category/retrieve",
    async () => {
        const res = await CategoryService.getAll();
        const categoryList = res.data.data
        return { categoryList }
    }
)

export const createCategory = createAsyncThunk(
    "category/create",
    async (data: CreateCategoryType, { rejectWithValue }) => {
        try {
            const response = await CategoryService.createCategory(data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveCategory.fulfilled, (state, action: PayloadAction<CategoryState>) => {
            state.categoryList = action.payload.categoryList
        })
        builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
            state.categoryList.push(action.payload);
        });
    }
})

export default categorySlice.reducer