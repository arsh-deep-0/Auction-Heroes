import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamLogo: {
    type: String,
    required: true,
  },
  initialPurse: {
    type: Number,
    required: true,
  },
  currentPurse: {
    type: Number,
    required: true,
  },
  currentPlayerCount: {
    type: Number,
    required: true,
    default: 0,
  },
  playersBought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  teamPoints: {
    type: Number,
    required: true,
  },
  auctionRoomID: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  playersBoughtCount:{
    type: Number,
    required: true,
  },
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

export const Team = mongoose.model("Team", teamSchema);
