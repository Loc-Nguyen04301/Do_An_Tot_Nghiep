import SaleCampaignService from "@/services/SaleCampaignService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SaleCampaignState {
    from_date?: string
    to_date?: string
}

const initialState: SaleCampaignState = {
    from_date: undefined,
    to_date: undefined
}

export const getOnlyCampaignActive = createAsyncThunk(
    "saleCampaign/getTime",
    async () => {
        const res = await SaleCampaignService.getOnlyCampaignActive()
        return res.data.data;
    }
);

export const saleCampaignSlice = createSlice({
    name: 'saleCampaign',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOnlyCampaignActive.fulfilled, (state, action: PayloadAction<SaleCampaignState>) => {
            state.from_date = action.payload.from_date;
            state.to_date = action.payload.to_date;
        });
    }
})

export default saleCampaignSlice.reducer