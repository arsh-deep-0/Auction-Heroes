import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ranking: {
    type: Number,
    required: true,
  },
  totalPoints:{
    type: Number,
    required: true,
  }
});

const auctionSummarySchema = new mongoose.Schema(
  {
    rankings: [rankingSchema],
    required: true,
  },
  {
    timestamps: true,
  }
);

export const AuctionSummary = new mongoose.model(
  "AuctionSummary",
  auctionSummarySchema
);
