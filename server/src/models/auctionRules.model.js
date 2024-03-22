import mongoose from "mongoose";

const auctionRulesSchema = new mongoose.Schema(
  {
    buyersCount: {
      type: Number,
      required: true,
    },
    playersCount: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    maxOverseas: {
      type: Number,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
    minPlayers: {
      type: Number,
      required: true,
    },
    minWicketkeepers: {
      type: Number,
      required: true,
    },
    minBatsmen: {
      type: Number,
      required: true,
    },
    minBowlers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const AuctionRules = mongoose.model("AuctionRules", auctionRulesSchema);
