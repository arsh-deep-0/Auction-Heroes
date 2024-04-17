import { eventTypes } from "@/constants/eventTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const currentBidSlice = createSlice({
  name: "currentBid",
  initialState,
  reducers: {
    increaseBid: (state) => {
      const rem = (state.amount * 10) % 10;
      if (rem == 0 || rem == 8) {
        state.amount += 0.2;
      } else state.amount += 0.3;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("BID_INC", (state, action) => {
      state.amount=action.payload.currentAmount;
    });
  },
});

export default currentBidSlice.reducer;
export const { increaseBid } = currentBidSlice.actions;
