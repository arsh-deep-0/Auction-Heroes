import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auctionInProcess: false,
  time: 15,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    reduceTimerCount: (state) => {
      state.time--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("currentBid/increaseBid", (state) => {
      state.auctionInProcess = true;
      state.time = 15;
    });
  },
});

export default timerSlice.reducer;
export const { reduceTimerCount } = timerSlice.actions;
