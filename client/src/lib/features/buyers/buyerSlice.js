import { createSlice ,current} from "@reduxjs/toolkit";

const initialState = {
  buyers: {
    // mi:{
    //   teamLogo: "mi",
    //   currentPurse: 23.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 7,
    //   teamName: "Arshdeep Singh",
    //   order: 1,
    // },
    //csk: {
    //   teamLogo: "csk",
    //   currentPurse: 33.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 4,
    //   teamName: "Bhavya Vohra",
    //   order: 2,
    // },
    //srh: {
    //   teamLogo: "srh",
    //   currentPurse: 17.7,
    //   initialPurse: 50,
    //   playersBoughtCount: 4,
    //   teamName: "Akash Choudary",
    //   order: 3,
    // },
    // rr:{
    //   teamLogo: "rr",
    //   currentPurse: 40.2,
    //   initialPurse: 50,
    //   playersBoughtCount: 3,
    //   teamName: "Manik Raj",
    //   order: 4,
    // },
    //pbks: {
    //   teamLogo: "pbks",
    //   currentPurse: 23.6,
    //   initialPurse: 50,
    //   playersBoughtCount: 7,
    //   teamName: "Bhaskar Mishra",
    //   order: 5,
    // },
  },
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
  extraReducers: (builder) => {
    builder.addCase("PLAYER_SOLD", (state, action) => {
      //for buyer with logo , set currentPurse=currentPurse-amountSold
      console.log('sold action payload:',action.payload)
      const logo=action.payload.buyerLogo;
      console.log('logo:',logo)
      console.log('state in PLAYER_SOLD reducer:',current(state))
        const buyingTeam = current(state.buyers[logo]);
        console.log('buying team:',buyingTeam)

        state.buyers[logo].currentPurse = action.payload.currentPurse;
        state.buyers[logo].playersBoughtCount = action.payload.playersBoughtCount;

        console.log('updated state:',current(state))
      
    });
    builder.addCase("BUYERS_INFO",(state,action)=>{
      console.log('buyers info:',action.payload)
      //action.payload object is like this {mi:{currentPurse:21,playersBoughtCount:7,teamLogo:'mi'},csk:{currentPurse:21,playersBoughtCount:7,teamLogo:'mi'}} update the state accordingly
      const updatedBuyersInfo = action.payload.buyers;
      Object.keys(updatedBuyersInfo).forEach((logo) => {
        state.buyers[logo].currentPurse = updatedBuyersInfo[logo].currentPurse;
        state.buyers[logo].playersBoughtCount = updatedBuyersInfo[logo].playersBoughtCount;
      });
    })
  },
});

export default buyerSlice.reducer;
export const { addBuyer, addBuyers } = buyerSlice.actions;
