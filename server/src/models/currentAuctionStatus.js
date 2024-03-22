import mongoose from "mongoose";

const currentAuctionStatusSchema = new mongoose.Schema(
  {
    auctionID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      index: true,
    },
    currentBidder: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    currentTimer: {
      type: Number,
      required: true,
      default: 0,
    },
    currentPlayerOrder: {
      type: Number,
      required: true,
    },
    currentBidAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CurrentAuctionStatus = mongoose.model(
  "CurrentAuctionStatus",
  currentAuctionStatusSchema
);
