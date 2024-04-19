import { redisClient } from "../utils/redis.js";

const currentStateSocket = (io, socket) => {
  return () => {
    socket.on("GET_CURRENT_BID_INFO", async (roomData) => {
      console.log("got room data", roomData);
      console.log(socket.userID, socket.rooms);
      const currentAmount = await redisClient.get(
        `${"currentBid-" + roomData.auctionRoomID}`
      );
      roomData.currentAmount = Number(currentAmount);
      socket.join(roomData.auctionRoomID); 
      console.log('roomData:',roomData);
      io.to(socket.id).emit("CURRENT_BID_INFO", roomData);
    });
  };
};
export default currentStateSocket;
