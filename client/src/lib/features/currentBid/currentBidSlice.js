import { eventTypes } from "@/constants/eventTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const currentBidSlice = createSlice({
  name: "currentBid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("BID_INC", (state, action) => {
      state.amount = action.payload.currentAmount;
    }),
    builder.addCase("CURRENT_BID_INFO", (state, action) => {
      state.amount = action.payload.currentAmount;
    })
  },
});

export default currentBidSlice.reducer;
