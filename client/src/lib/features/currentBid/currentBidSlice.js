import { eventTypes } from "@/constants/eventTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  currentPlayerOrder: 1,
  currentBidderID: null,
  currentBidderName: null,
  currentBidderLogo: null,
};

const currentBidSlice = createSlice({
  name: "currentBid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("BID_INC", (state, action) => {
      state.amount = action.payload.currentAmount;
      state.currentPlayerOrder = action.payload.currentPlayerOrder;
      state.currentBidderID = action.payload.currentBidderID;
      state.currentBidderName = action.payload.currentBidderName;
      state.currentBidderLogo = action.payload.currentBidderLogo;
    }),
      builder.addCase("CURRENT_BID_INFO", (state, action) => {
        console.log("action-pay", action.payload);
        state.amount = action.payload.currentAmount;
        state.currentPlayerOrder = action.payload.currentPlayerOrder;
        state.currentBidderID = action.payload.currentBidderID;
        state.currentBidderName = action.payload.currentBidderName;
        state.currentBidderLogo = action.payload.currentBidderLogo;
      }),
      builder.addCase("PLAYER_SOLD", (state, action) => {
        state.currentPlayerOrder++;
      });
  },
});

export default currentBidSlice.reducer;
