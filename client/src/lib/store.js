import { configureStore } from "@reduxjs/toolkit";
import currentBidReducer from "./features/currentBid/currentBidSlice";
import buyersReducer from "./features/buyers/buyerSlice"
import timerReducer from "./features/timer/timerSlice"

const store = configureStore({
  reducer: {
    currentBid: currentBidReducer,
    buyers:buyersReducer,
    timer: timerReducer
  },
});

export default store;
