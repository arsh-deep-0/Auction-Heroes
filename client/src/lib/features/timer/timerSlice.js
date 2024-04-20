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
    });
  },
});

export default timerSlice.reducer;