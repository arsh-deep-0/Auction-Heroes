import {
  addBuyerToAuction,
  checkHostByRoomID,
  joinWaitingRoom,
  leaveWaitingRoom,
  removeBuyerFromAuction,
} from "../controllers/auction.controller.js";
import { User } from "../models/user.model.js";
import { WaitingRoom } from "../models/waitingRoom.model.js";

const auctionSocket = (io, socket) => {
  return () => {
    socket.on("join-waiting-room", async (joiningData) => {
      try {
        const { waitingRoomID } = joiningData;
        const result = await joinWaitingRoom(socket, joiningData);
        console.log("users: ", result.users);
        console.log("rooms: ", socket.rooms);

        io.to(waitingRoomID).emit("update-status", result.users);
      } catch (error) {
        console.log("error in joining room: ", error);
      }
    });

    socket.on("leave-waiting-room", async (leavingData) => {
      try {
        const { waitingRoomID } = leavingData;
        const result = await leaveWaitingRoom(socket, leavingData);
        console.log("users: ", result.users);
        io.to(waitingRoomID).emit("update-status", result.users);
      } catch (error) {
        console.log("error in leaving room: ", error);
      }
    });

    socket.on("addBuyerToAuction", async (joiningData) => {
      try {
        const result = await addBuyerToAuction(socket, joiningData);
        console.log(socket.rooms);
        io.to(`${joiningData.waitingRoomID}`).emit(
          "addBuyerToAuctionResult",
          result
        );
      } catch (error) {
        console.error("Error in addBuyerToAuction:", error);
      }
    });

    socket.on("removeBuyerFromAuction", async (removingData) => {
      try {
        const result = await removeBuyerFromAuction(socket, removingData);
        io.to(`${removingData.waitingRoomID}`).emit(
          "removeBuyerFromAuctionResult",
          result
        );
      } catch (error) {
        console.error("Error in removeBuyerFromAuction:", error);
      }
    });

    socket.on("start-auction", async (data) => {
      try {
        const { waitingRoomID } = data;
        const isHost = checkHostByRoomID(waitingRoomID, socket);
        if (isHost) {
          io.to(waitingRoomID).emit("auction-started");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
};

export default auctionSocket;

export const onLeavingWaitingRoom = (io, socket) => {
  return async () => {
    console.log("Leaving user id:", socket.userID);

    console.log("socket.userID: ", socket.userID);

    const user = await User.findById(socket.userID);
    const waitingRoomID = user?.latestWaitingRoom;
    if (!waitingRoomID) {
      return;
    }

    // Save the updated waiting room
    const newRoom = await WaitingRoom.findOneAndUpdate(
      {
        waitingRoomID: waitingRoomID,
        onlineParticipants: socket.userID,
        "participants.userID": socket.userID,
      },
      { $set: { "participants.$.isOnline": false } },
      {
        new: true,
      }
    );
    if (!newRoom) {
      return;
    }
    newRoom?.onlineParticipants?.pull(socket.userID);
    console.log("new room: ", newRoom);
    try {
      await newRoom?.save();
    } catch (err) {
      console.log("error while saving : ", err);
    }

    io.to(`${waitingRoomID}`).emit("update-status", newRoom.participants);
  };
};
