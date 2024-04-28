import { eventTypes } from "@/constants/eventTypes";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  currentPlayerOrder: 1,
  currentBidderID: null,
  currentBidderName: null,
  currentBidderLogo: null,
  playersSold: 0,
  playersUnsold: 0,
  totalPlayers: 70,
};

const currentBidSlice = createSlice({
  name: "currentBid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("BID_INC", (state, action) => {
      console.log("bid-inc action payload", action.payload);
      const currentBid = action.payload;
      state.amount = currentBid.currentAmount;
      state.currentPlayerOrder = currentBid.currentPlayerOrder;
      state.currentBidderID = currentBid.currentBidderID;
      state.currentBidderName = currentBid.currentBidderName;
      state.currentBidderLogo = currentBid.currentBidderLogo;
    }),
      builder.addCase("CURRENT_BID_INFO", (state, action) => {
        console.log("action-pay", action.payload);
        const currentBid =
          typeof action.payload === "object"
            ? action.payload
            : JSON.parse(action.payload);
        console.log("current bid", currentBid);
        console.log("currentBidderLogo", currentBid.currentBidderLogo);
        state.amount = currentBid.currentAmount;
        state.currentPlayerOrder = currentBid.currentPlayerOrder;
        state.currentBidderID = currentBid.currentBidderID;
        state.currentBidderName = currentBid.currentBidderName;
        state.currentBidderLogo = currentBid.currentBidderLogo;
        state.playersSold = currentBid.playersSold;
        state.playersUnsold = currentBid.playersUnsold;
        console.log("current bid updated to:", current(state));
      }),
      builder.addCase("PLAYER_SOLD", (state, action) => {
        const currentBid = JSON.parse(action.payload);
        state.currentPlayerOrder = currentBid.currentPlayerOrder;
      });
  },
});

export default currentBidSlice.reducer;
