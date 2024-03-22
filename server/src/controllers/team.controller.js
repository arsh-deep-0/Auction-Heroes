import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Team } from "../models/team.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createTeam = asyncHandler(async (req, res) => {
  const {
    teamName,
    teamLogo,
    intialPurse,
    currentPurse,
    currentPlayerCount,
    isComplete,
    teamPoints,
  } = req.body;

  const team = await Team.create({
    teamName,
    teamLogo,
    intialPurse,
    currentPurse,
    currentPlayerCount,
    isComplete,
    teamPoints,
  });

  const createdTeam = await Team.findOne(team._id);

  if (!createdTeam) {
    throw new ApiError(500, "Something went wrong while creating the Team");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTeam, "Team created successfully"));
});

const getTeamAnalytics = asyncHandler(async (req, res) => {
  const teamName = req.params.name;

  if (!teamName?.trim()) {
    throw new ApiError(`team name is missing`);
  }

  const teamAnalytics = await Team.aggregate([
    { // in teams collection , matches all documents with the given teamName 
      $match: {
        teamName: teamName?.toLowerCase(),
      },
    },
    { /*    Now matches the local field (_id) for these matched documents with fieldname buyer_ID in contracts collections
       by usiing lookup command and then saves those foreign matched documents in contracts field of earlier matched team documents  */
      $lookup: {
        from: "contracts",
        foreignField: "buyer_ID",
        localField: "_id",
        as: "contracts",
        pipeline: [ /* Now whenever a document in contracts collection is matched, match player_ID field of this document with 
          _id of documents in players collections and save it in a array under playerData field of contracts field */
          {
            $lookup: {
              from: "players",
              localField: "player_ID",
              foreignField: "_id",
              as: "playerData",
              pipeline: [
                {
                  $project: { // only these fields will be populated
                    playerFirstName: 1,
                    playerLastName: 1,
                    battingPoints: 1,
                    bowlingPoints: 1,
                    wkPoints: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              playerData: {
                $first: "$playerData", // only the first element of playerData array will be showed
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        playerCount: {
          $size: "$contracts", // add a new field that computes the size of contracts array
        },
      },
    },
    {
      $project: {  // show/send only these fields in Teams Object 
        teamName: 1,
        playerCount: 1,
        contracts: 1,
      },
    },
  ]);

  if (!teamAnalytics?.length) {
    throw new ApiError(404, "team doesnot exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        teamAnalytics[0],
        "team analytics fetched successfully"
      )
    );
});

export { createTeam, getTeamAnalytics };
