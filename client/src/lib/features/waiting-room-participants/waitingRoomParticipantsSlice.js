import { createSlice } from "@reduxjs/toolkit";

const initialState = {users: []};

const waitingRoomParticpantSlice = createSlice({
  name: "waitingRoomParticpant",
  initialState,
  reducers: {
    addParticipant:(state,action)=>{
        state.users=action.payload;
    }
  },
});

export default waitingRoomParticpantSlice.reducer;
export const {addParticipant}=waitingRoomParticpantSlice.actions;
