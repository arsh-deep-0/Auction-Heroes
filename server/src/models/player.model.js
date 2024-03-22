import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playerSchema = new mongoose.Schema(
  {
    playerFirstName: {
      type: String,
      required: true,
    
    },
    playerLastName: {
      type: String,
      required: true,
     
    },
    order:{
      type:Number,
      required: true,
    },
    battingPoints: {
      type: Number,
      required: true,
    },
    bowlingPoints: {
      type: Number,
      required: true,
    },
    wkPoints: {
      type: Number,
      required: true,
    },
    playerImgSrc: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
      default:0
    },
    isSold: {
      type: Boolean,
      required: true,
      default: false,
    },
    currentBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    currentTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    nationality:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

playerSchema.plugin(mongooseAggregatePaginate)
export const Player = mongoose.model("Player", playerSchema);
