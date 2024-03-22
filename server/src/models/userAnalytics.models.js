import mongoose from "mongoose";

const userAnalyticsSchema = new mongoose.Schema(
  {
    matchesPlayed: {
      type: Number,
      required: true,
    },
    matchesWon: {
      type: Number,
      required: true,
    },
    tournamentsPlayed: {
      type: Number,
      required: true,
    },
    matchesSummaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionSummary",
        required: true,
      },
    ],
    tournamentSummaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentSummary",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const userAnalytics = new mongoose.model(
  "UserAnalytics",
  userAnalyticsSchema
);
