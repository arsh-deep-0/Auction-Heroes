import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AuctionRules } from "../models/auctionRules.model.js";

const createAuctionRules = asyncHandler(async (req, res) => {
  const {
    buyersCount,
    playersCount,
    budget,
    maxOverseas,
    maxPlayers,
    minPlayers,
    minWicketkeepers,
    minBatsmen,
    minBowlers,
  } = req.body;

  // Create a new AuctionRules object
  const auctionRules = await AuctionRules.create({
    buyersCount,
    playersCount,
    budget,
    maxOverseas,
    maxPlayers,
    minPlayers,
    minWicketkeepers,
    minBatsmen,
    minBowlers,
  });

  // Check if the auction rules were successfully created
  if (!auctionRules) {
    throw new ApiError(
      500,
      "Something went wrong while creating auction rules"
    );
  }

  // Return the response
  return res
    .status(201)
    .json(
      new ApiResponse(201, auctionRules, "Auction rules created successfully")
    );
});

export { createAuctionRules };
