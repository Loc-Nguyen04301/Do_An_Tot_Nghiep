import BillService from "@/services/BillService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBillNoti {
   id: number;
   user_id: number;
   customer_name: string;
   created_at: string;
   is_read: boolean;
}

interface BillNotiState {
   billNotis: IBillNoti[],
   unread_records: number
}

const initialState: BillNotiState = {
   billNotis: [],
   unread_records: 0
}

export const fetchBillNoti = createAsyncThunk('billNoti/fetchBillNoti', async () => {
   try {
      const res = await BillService.getBillNotification()
      return res.data.data
   } catch (error) {
      console.log(error)
   }
})

export const billNotiSlice = createSlice({
   name: 'billNoti',
   initialState,
   reducers: {
      markReadBill: (state, action: PayloadAction<{ id: number }>) => {
         const isReadBill = state.billNotis.find((item) => item.id === action.payload.id)
         if (isReadBill && isReadBill.is_read === false) {
            isReadBill.is_read = true
            state.unread_records -= 1
         }
      },
      createBillNoti: (state, action: PayloadAction<IBillNoti>) => {
         state.billNotis = [action.payload, ...state.billNotis]
         state.unread_records += 1
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchBillNoti.fulfilled, (state, action: PayloadAction<BillNotiState>) => {
         return { ...action.payload }
      })
      builder.addCase(fetchBillNoti.rejected, () => {
         return
      })
      builder.addCase(fetchBillNoti.pending, () => {
         return
      })
   }
})

export const { markReadBill, createBillNoti } = billNotiSlice.actions

export default billNotiSlice.reducer

