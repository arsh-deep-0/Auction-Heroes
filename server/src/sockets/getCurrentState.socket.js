import { getAuctionByRoomID } from "../controllers/auction.controller.js";
import {
  getAllTeamsByRoomIDFunction,
} from "../controllers/team.controller.js";
import { redisClient } from "../utils/redis.js";

const currentStateSocket = (io, socket) => {
  return () => {
    socket.on("GET_CURRENT_BID_INFO", async (roomData) => {
      console.log("got room data", roomData);

      const auctionRoomID = roomData.auctionRoomID;

      const currentBidInfoKey = `currentBidInfo-${auctionRoomID}`;

      const currentBidInfo = await redisClient.get(currentBidInfoKey);
      if (currentBidInfo) {
        roomData = currentBidInfo;
        console.log('c bid Info ID', roomData)
      } else {
        const auction = await getAuctionByRoomID(auctionRoomID);
        roomData = {
          currentAmount: 0,
          timer: 15,
          auctionInProgress: false,
          currentBidderName: null,
          currentBidderLogo: null,
          currentPlayerOrder: Number(auction.currentPlayerOrder),
        };
        console.log('c bid Info ELSE', roomData)
        await redisClient.set(currentBidInfoKey,JSON.stringify(roomData))
      }
      console.log('c bid Info', roomData)
      io.to(socket.id).emit("CURRENT_BID_INFO", roomData);
    });

    socket.on("GET_BUYERS_INFO", async (buyerData) => {
      console.log("buyer data", buyerData);
      const roomID = buyerData.auctionRoomID;
      console.log("teams:", buyerData.teams);

      const buyersInfoKey = `buyersInfo-${roomID}`;

      const buyersInfo = await redisClient.get(buyersInfoKey);
      if (buyersInfo) {
        buyerData.buyers = JSON.parse(buyersInfo);
      } else {
        const auctionTeams = await getAllTeamsByRoomIDFunction(roomID);
        console.log("auctionTeams:", auctionTeams);

        buyerData.buyers = auctionTeams;

        redisClient.set(buyersInfoKey, JSON.stringify(buyerData.buyers));
      }

      console.log('buyers Info', buyerData)
      io.to(socket.id).emit("BUYERS_INFO", buyerData.buyers);
    });
  };
};
export default currentStateSocket;
