import { applyMiddleware,configureStore } from "@reduxjs/toolkit";
import currentBidReducer from "./features/currentBid/currentBidSlice";
import buyersReducer from "./features/buyers/buyerSlice"
import timerReducer from "./features/timer/timerSlice"
import waitingRoomParticipantsReducer from "./features/waiting-room-participants/waitingRoomParticipantsSlice";
import socketMiddleware from "../middleware/socketMiddleware";


const store = configureStore({
  reducer: {
    currentBid: currentBidReducer,
    buyers:buyersReducer,
    timer: timerReducer,
    waitingRoomParticipants: waitingRoomParticipantsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
