import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auctionInProcess: false,
  time: 15,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("BID_INC", (state, action) => {
      state.auctionInProcess = action.payload.auctionInProcess; 
      state.time = action.payload.time;
    }),
    builder.addCase("CURRENT_BID_INFO", (state, action) => {
      console.log("PLAYER_SOLD", action.payload);
      state.auctionInProcess = action.payload.auctionInProcess; 
    });
  },
});

export default timerSlice.reducer;