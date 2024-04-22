import mongoose from "mongoose";

const currentAuctionStatusSchema = new mongoose.Schema(
  {
    auctionRoomID: {
      type:Number,
      required: true,
      index: true,
    },
    currentBidderID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"User",
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
