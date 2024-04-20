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

      const keysExist = await checkKeyExistence([
        currentPlayerOrderKey,
        currentBidderIDKey,
        timerKey,
        currentBidKey,
        currentBidderNameKey,
        currentBidderLogoKey,
      ]);
      console.log('keysexist', keysExist);
      if (keysExist) {
        const multi = redisClient.multi();

        multi.get(currentBidKey);
        multi.get(timerKey);
        multi.get(currentBidderIDKey);
        multi.get(currentBidderNameKey);
        multi.get(currentBidderLogoKey);
        multi.get(currentPlayerOrderKey);

        const [
          currentAmount,
          timer,
          currentBidderID,
          currentBidderName,
          currentBidderLogo,
          currentPlayerOrder,
        ] = await multi.exec();
        console.log(
          "REDIS DATA",
          currentAmount,
          currentBidderID,
          currentBidderID,
          currentBidderLogo,
          currentBidderName
        );

        roomData.currentAmount = Number(currentAmount[1]);
        roomData.timer = Number(timer[1]);
        roomData.currentBidderID = currentBidderID[1];
        roomData.currentBidderName = currentBidderName[1];
        roomData.currentBidderLogo = currentBidderLogo[1];
        if (!currentPlayerOrder) {
          roomData.currentPlayerOrder = 1;
        } else {
          roomData.currentPlayerOrder = Number(currentPlayerOrder);
        }
      }else{
        roomData.currentAmount = 0;
        roomData.timer = 0;
        roomData.currentBidderID = null;
        roomData.currentBidderName = null;
        roomData.currentBidderLogo = null;
        roomData.currentPlayerOrder = 1;
      }

      socket.join(roomData.auctionRoomID);
      console.log("roomData:", roomData);
      io.to(socket.id).emit("CURRENT_BID_INFO", roomData);
    });
  };
};
export default currentStateSocket;

const checkKeyExistence = async (keys) => {
  const multi = redisClient.multi();

  keys.forEach((key) => {
    console.log('key:',key)
    multi.exists(key);
  });

  const existenceResults = await multi.exec();
  console.log('existense', existenceResults)

  for (let i = 0; i < existenceResults.length; i++) {
    if (existenceResults[i][1] === 0) {
      return false;
    }
  }

  return true;
};
