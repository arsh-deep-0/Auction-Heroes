import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    buyer_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    player_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    auction_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
    amountSold:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
);

export const Contract = new mongoose.model("Contract", contractSchema);

Contract.collection.createIndex({ auction_ID: 1 });