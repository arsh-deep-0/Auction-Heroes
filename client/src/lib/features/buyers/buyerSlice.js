import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    teamName: "mi",
    currentWallet: 23.6,
    totalWallet: 50,
    playersBought: 7,
    playerName: "Arshdeep Singh",
    order: 1,
  },
  {
    teamName: "csk",
    currentWallet: 33.6,
    totalWallet: 50,
    playersBought: 4,
    playerName: "Bhavya Vohra",
    order: 2,
  },
  {
    teamName: "srh",
    currentWallet: 17.7,
    totalWallet: 50,
    playersBought: 4,
    playerName: "Akash Choudary",
    order: 3,
  },
  {
    teamName: "rr",
    currentWallet: 40.2,
    totalWallet: 50,
    playersBought: 3,
    playerName: "Manik Raj",
    order: 4,
  },
  {
    teamName: "pbks",
    currentWallet: 23.6,
    totalWallet: 50,
    playersBought: 7,
    playerName: "Bhaskar Mishra",
    order: 5,
  },
];

const buyerSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {
    addBuyer: (state, action) => {
      initialState.push(action.payload);
    },
  },
});

export default buyerSlice.reducer;
export const { addBuyer } = buyerSlice.actions;
