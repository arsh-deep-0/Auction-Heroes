import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const waitingRoomParticpantSlice = createSlice({
  name: "waitingRoomParticpant",
  initialState,
  reducers: {
    addParticipant:(state,action)=>{
        state.push(action.payload);
    }
  },
});

export default waitingRoomParticpantSlice.reducer;
export const {addParticipant}=waitingRoomParticpantSlice.actions;
