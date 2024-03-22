import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Auction } from "../models/auction.model.js";
import { AuctionRules } from "../models/auctionRules.model.js";
import { User } from "../models/user.model.js";

const createRoomID = async (req, res) => {
  let unique = false;
  while (!unique) {
    const generateSixDigitNumber = Math.floor(Math.random() * 900000 + 100000);

    const auction = await Auction.findOne({
      auctionRoomID: generateSixDigitNumber,
    });
    if (!auction.length) {
      unique = true;
      return generateSixDigitNumber;
    }
  }
};

const createAuction = asyncHandler(async (req, res) => {
  const { auctionName, hostID, date, auctionRulesID } = req.body;
  const auctionRoomID = await createRoomID();
  const auction = await Auction.create({
    auctionName,
    host: hostID,
    date,
    auctionRules: auctionRulesID,
    auctionRoomID,
    waitingRoomID: auctionRoomID,
    buyers: [hostID],
  });

  const createdAuction = await Auction.findOne(auction?._id);

  if (!createdAuction) {
    throw new ApiError(
      500,
      "something went wrong while creating a new auction"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdAuction, "Auction created succesfully"));
});

const addBuyerToAuction = async (socket, joiningData) => {
  try {
    const { userID, waitingRoomID } = joiningData;
    const user = await getUser(userID);
    console.log("joining data", joiningData);
    console.log(waitingRoomID);
    const auction = await getAuctionByRoomID(waitingRoomID);

    const isMember = await isAuctionMember(userID, auction);
    console.log("isMember: ", isMember);
    if (isMember) {
      socket.join(`${waitingRoomID}`)
      return { waitingRoomID, userID, wasMember: true };
    }

    console.log(user);
    await isHostOrUserHimself(user, socket, auction); // Check if the user attempting to remove the buyer is the buyer or the auction host

    auction.buyers.push(userID);
    await auction.save({ validateBeforeSave: false });

    socket.join(`${waitingRoomID}`)

    // Emit an event indicating successful addition of the buyer
    return { waitingRoomID, userID, wasMember: false };
  } catch (error) {
    console.error("Error in addBuyerToAuction:", error);
    // Return an error object if there's an error
    return { error: error.message };
  }
};

const removeBuyerFromAuction = async (socket, removingData) => {
  try {
    const { userID, waitingRoomID } = removingData;
    const user = await getUser(userID);
    console.log("removing data", removingData);
    console.log(waitingRoomID);
    const auction = await getAuctionByRoomID(waitingRoomID);

    const isMember = await isAuctionMember(userID, auction);
    if (!isMember) {
      socket.leave(`${waitingRoomID}`)
      return { waitingRoomID, userID, wasMember: false };
    }

    await isHostOrUserHimself(user, socket, auction); // Check if the user attempting to remove the buyer is the buyer himself or the auction host
    auction.buyers.pull(userID);
    await auction.save({ validateBeforeSave: false });

    socket.leave(`${waitingRoomID}`)
    return { waitingRoomID, userID, wasMember: true };
  } catch (error) {
    console.error("Error in removeBuyerToAuction:", error);
    return { error: error.message };
  }
};

const getAuctionByRoomID = async (auctionRoomID) => {
  console.log(auctionRoomID);
  const auction = await Auction.findOne({ auctionRoomID });
  console.log(auction);
  if (!auction) {
    throw new ApiError(404, "Room does not exist");
  }
  return auction;
};

const isHostOrUserHimself = async (user, socket, auction) => {
  if (
    socket.userID.toString() !== user._id.toString() &&
    socket.userID.toString() !== auction.host.toString()
  ) {
    throw new ApiError(403, "Unauthorized request");
  }
};

const getUser = async (userID) => {
  const user = await User.findOne({ _id: userID });
  if (!user) {
    throw new ApiError(404, "No such user exists");
  }
  return user;
};

const isAuctionMember = async (userID, auction) => {
  if (auction.buyers.includes(userID)) {
    console.log("Auction member already exists");
    return true;
  }
  return false;
};

const isHost = async (socket, auction) => {
  if (auction.host.toString() !== socket.userID.toString()) {
    throw new ApiError(403, "Unauthorized request");
  }
};

export {
  createAuction,
  addBuyerToAuction,
  removeBuyerFromAuction,
  getAuctionByRoomID,
  isHostOrUserHimself,
  getUser,
  isHost,
  isAuctionMember
};
