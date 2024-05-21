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
   bills: IBillNoti[],
   unread_records: number
}

const initialState: BillNotiState = {
   bills: [],
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
         console.log(action.payload.id)
         const isReadBill = state.bills.find((item) => item.id === action.payload.id)
         if (isReadBill && isReadBill.is_read === false) {
            isReadBill.is_read = true
            state.unread_records -= 1
         }
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

export const { markReadBill } = billNotiSlice.actions

export default billNotiSlice.reducer

