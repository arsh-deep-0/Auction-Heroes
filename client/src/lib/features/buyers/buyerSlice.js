import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyers: [
    // {
    //   teamLogo: "mi",
    //   currentPurse: 23.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 7,
    //   teamName: "Arshdeep Singh",
    //   order: 1,
    // },
    // {
    //   teamLogo: "csk",
    //   currentPurse: 33.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 4,
    //   teamName: "Bhavya Vohra",
    //   order: 2,
    // },
    // {
    //   teamLogo: "srh",
    //   currentPurse: 17.7,
    //   initialPurse: 50,
    //   playersBoughtCount: 4,
    //   teamName: "Akash Choudary",
    //   order: 3,
    // },
    // {
    //   teamLogo: "rr",
    //   currentPurse: 40.2,
    //   initialPurse: 50,
    //   playersBoughtCount: 3,
    //   teamName: "Manik Raj",
    //   order: 4,
    // },
    // {
    //   teamLogo: "pbks",
    //   currentPurse: 23.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 7,
    //   teamName: "Bhaskar Mishra",
    //   order: 5,
    // },
  ],
};

const buyerSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {
    addBuyer: (state, action) => {
      state.buyers.push(action.payload);
    },
    addBuyers: (state, action) => {
      console.log("action paylaod: ", action.payload);
      state.buyers = action.payload;
      console.log("state: ", state.buyers);
    },
  },
});

export default buyerSlice.reducer;
export const { addBuyer, addBuyers } = buyerSlice.actions;
