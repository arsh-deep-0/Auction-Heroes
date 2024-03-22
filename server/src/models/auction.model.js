import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    auctionRoomID: {
      type: String,
      required: true,
      index :true,
    },
    auctionName: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    }],
    date: {
      type: Date,
      required: true,
    },
    auctionSummary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuctionSummary",
    },
    waitingRoomID: {
      type: String,
      required: true,
    },
    auctionRules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuctionRules",
      required: true,
    },
  },
  { timestamps: true }
);

export const Auction = mongoose.model("Auction", auctionSchema);
