import SaleCampaignService, { ICreateSaleCampaign } from "@/services/SaleCampaignService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISaleCampaign {
    id: number
    name: string
    from_date: string
    to_date: string
    active: boolean
}

interface SaleCampaignState {
    from_date?: string
    to_date?: string
    listCampaign?: ISaleCampaign[]
}

const initialState: SaleCampaignState = {
    from_date: undefined,
    to_date: undefined,
    listCampaign: []
}

export const createCampaign = createAsyncThunk(
    "saleCampaign/createCampaign",
    async ({ name, from_date, to_date }: ICreateSaleCampaign, { rejectWithValue }) => {
        try {
            const res = await SaleCampaignService.createCampaign({ name, from_date, to_date })
            return res.data.data
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getOnlyCampaignActive = createAsyncThunk(
    "saleCampaign/getTime",
    async () => {
        const res = await SaleCampaignService.getOnlyCampaignActive()
        return res.data.data
    }
);

export const getCampaigns = createAsyncThunk(
    "saleCampaign/getListCampaigns",
    async () => {
        const res = await SaleCampaignService.getCampaign()
        return res.data.data
    }
)

export const activeCampaign = createAsyncThunk(
    "saleCampaign/activeCampaign",
    async (id: number) => {
        const res = await SaleCampaignService.activeCampaign(id)
        return id
    }
)

export const deleteCampaign = createAsyncThunk(
    "saleCampaign/deleteCampaign",
    async (id: number) => {
        const res = await SaleCampaignService.deleteCampaign(id)
        return id
    }
)

export const saleCampaignSlice = createSlice({
    name: 'saleCampaign',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCampaign.fulfilled, (state, action) => {
            state.listCampaign?.unshift(action.payload)
        })
        builder.addCase(getOnlyCampaignActive.fulfilled, (state, action) => {
            state.from_date = action.payload.from_date;
            state.to_date = action.payload.to_date;
        })
        builder.addCase(getCampaigns.fulfilled, (state, action) => {
            state.listCampaign = action.payload;
        })
        builder.addCase(activeCampaign.fulfilled, (state, action) => {
            state.listCampaign = state.listCampaign?.map((campaign) => {
                if (campaign.id === action.payload) campaign.active = true
                else campaign.active = false
                return campaign
            })
        })
        builder.addCase(deleteCampaign.fulfilled, (state, action) => {
            state.listCampaign = state.listCampaign?.filter((campaign) => campaign.id !== action.payload)
        })
    }
})

export default saleCampaignSlice.reducer