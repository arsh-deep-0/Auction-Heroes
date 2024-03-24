import { configureStore } from "@reduxjs/toolkit";
import currentBidReducer from "./features/currentBid/currentBidSlice";

const store = configureStore({
  reducer: {
    currentBid: currentBidReducer,
  },
});

export default store;
