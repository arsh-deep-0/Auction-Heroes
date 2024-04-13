import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Auction } from "../models/auction.model.js";
import { AuctionRules } from "../models/auctionRules.model.js";
import { User } from "../models/user.model.js";
import { WaitingRoom } from "../models/waitingRoom.model.js";

const createRoomID = async (req, res) => {
  let unique = false;
  while (!unique) {
    const generateSixDigitNumber = Math.floor(Math.random() * 900000 + 100000);

    const auction = await Auction.findOne({
      auctionRoomID: generateSixDigitNumber,
    });
    if (!auction) {
      unique = true;
      return generateSixDigitNumber;
    }
  }
};

const createAuction = asyncHandler(async (req, res) => {
  const { auctionName, date, auctionRulesID } = req.body;
  const hostID = req.user._id;
  console.log(req.body);
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

  await createWaitingRoom(auctionRoomID);

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

const createWaitingRoom = async (auctionRoomID) => {
  console.log(auctionRoomID);
  await WaitingRoom.create({
    waitingRoomID: auctionRoomID,
  });
};

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
      socket.join(`${waitingRoomID}`);
      return { waitingRoomID, userID, wasMember: true };
    }

    console.log(user);
    await isHostOrUserHimself(user, socket, auction); // Check if the user attempting to add the buyer is the buyer or the auction host

    auction.buyers.push(userID);
    await auction.save({ validateBeforeSave: false });

    socket.join(`${waitingRoomID}`);

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
      socket.leave(`${waitingRoomID}`);
      return { waitingRoomID, userID, wasMember: false };
    }

    await isHostOrUserHimself(user, socket, auction); // Check if the user attempting to remove the buyer is the buyer himself or the auction host
    auction.buyers.pull(userID);
    await auction.save({ validateBeforeSave: false });

    socket.leave(`${waitingRoomID}`);
    return { waitingRoomID, userID, wasMember: true };
  } catch (error) {
    console.error("Error in removeBuyerFromAuction:", error);
    return { error: error.message };
  }
};

const joinWaitingRoom = async (socket, joiningData) => {
  const result = await addBuyerToAuction(socket, joiningData);
  console.log("result: ", result);
  
  const existingParticipant = await WaitingRoom.findOneAndUpdate(
    {
      waitingRoomID: joiningData.waitingRoomID,
      participants: { $elemMatch: { userID: socket.userID } }
    },
    {
      $set: { "participants.$.isOnline": true },
      $addToSet: {
        onlineParticipants: socket.userID,
      },
    },
    {
      new:true
    }
  );

  if (!existingParticipant) {
    const waitingRoom = await WaitingRoom.findOneAndUpdate(
      {
        waitingRoomID: joiningData.waitingRoomID,
      },
      {
        $addToSet: {
          participants: { userID: socket.userID, isOnline: true },
          onlineParticipants: socket.userID,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const user = await User.findById(socket.userID);
    user.latestWaitingRoom = joiningData.waitingRoomID;
    await user.save();

    console.log("updated room: ", waitingRoom);
    result.users = waitingRoom.participants;
    return result;
  } else {
    const user = await User.findById(socket.userID);
    user.latestWaitingRoom = joiningData.waitingRoomID;
    await user.save();

    console.log("updated room: ", existingParticipant);
    result.users = existingParticipant.participants;
    return result;
  }
};


const leaveWaitingRoom = async (socket, leavingData) => {
  const result = await removeBuyerFromAuction(socket, leavingData);
  const waitingRoom = await WaitingRoom.findOneAndUpdate(
    {
      waitingRoomID: joiningData.waitingRoomID,
      "participants.userID": socket.userID,
    },
    {
      "participants.$.isOnline": false,
      "participants.$.userID": socket.userID,
    },
    {
      new: true,
      upsert: true,
    }
  );
  waitingRoom.onlineParticipants.pull( socket.userID );
  await waitingRoom.save();

  console.log("updated room: ", waitingRoom);
  result.users = waitingRoom.participants;
  return result;
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

const getWaitingRoomByRoomID = async (auctionRoomID) => {
  console.log(auctionRoomID);
  const waitingRoom = await WaitingRoom.findOne({
    waitingRoomID: auctionRoomID,
  });
  console.log(waitingRoom);
  if (!waitingRoom) {
    throw new ApiError(404, "Waiting Room does not exist");
  }
  return waitingRoom;
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

const hasAuctionStarted = async (auction) => {
  return auction.hasAuctionStarted;
};

const isHost = async (socket, auction) => {
  if (auction.host.toString() !== socket.userID.toString()) {
    throw new ApiError(403, "Unauthorized request");
  }
};

const checkHostByRoomID = async(roomID,socket)=>{
  const auction= await getAuctionByRoomID(roomID);
  return auction.host.toString() !== socket.userID.toString()
}

const getHostByRoomID = asyncHandler(async(req,res)=>{
  const roomID= req.params.roomID;
  const auction = await Auction.findOne({auctionRoomID:roomID})
  if(!auction){
    throw new ApiError(400,'Invalid Room ID')
  }
  return res
  .status(201)
  .json(new ApiResponse(201, {host:auction.host}, "Host info send successfully"));
})

export {
  createAuction,
  addBuyerToAuction,
  removeBuyerFromAuction,
  joinWaitingRoom,
  leaveWaitingRoom,
  getAuctionByRoomID,
  isHostOrUserHimself,
  getUser,
  isHost,
  isAuctionMember,
  getHostByRoomID,
  checkHostByRoomID,
};
