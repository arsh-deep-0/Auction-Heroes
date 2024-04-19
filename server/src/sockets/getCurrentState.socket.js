import { redisClient } from "../utils/redis.js";

const currentStateSocket = (io, socket) => {
  return () => {
    socket.on("GET_CURRENT_BID_INFO", async (roomData) => {
      console.log("got room data", roomData);
      console.log(socket.userID, socket.rooms);
      const currentBidKey = `currentBid-${roomData.auctionRoomID}`;
      const timerKey = `timer-${roomData.auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${roomData.auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${roomData.auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${roomData.auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${roomData.auctionRoomID}`;

      const currentAmount = await redisClient.get(currentBidKey);
      const timer = await redisClient.get(timerKey);
      const currentBidderID = await redisClient.get(currentBidderIDKey);
      const currentBidderName = await redisClient.get(currentBidderNameKey);
      const currentBidderLogo = await redisClient.get(currentBidderLogoKey);
      const currentPlayerOrder = await redisClient.get(currentPlayerOrderKey);

      roomData.currentAmount = Number(currentAmount);
      roomData.timer = Number(timer);
      roomData.currentBidderID = currentBidderID;
      roomData.currentBidderName = currentBidderName;
      roomData.currentBidderLogo = currentBidderLogo;
      if(!currentPlayerOrder){
        roomData.currentPlayerOrder = 1
      }else{
        roomData.currentPlayerOrder = Number(currentPlayerOrder);
      }
     
      socket.join(roomData.auctionRoomID); 
      console.log('roomData:',roomData);
      io.to(socket.id).emit("CURRENT_BID_INFO", roomData);
    });
  };
};
export default currentStateSocket;
