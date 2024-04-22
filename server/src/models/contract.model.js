import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    buyerLogo: {
      type: String,
    },
    playerOrder: {
      type:Number,
    },
    auctionRoomID: {
      type:Number
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