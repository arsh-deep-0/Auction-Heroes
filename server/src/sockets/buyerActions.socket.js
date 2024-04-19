import { redisClient } from "../utils/redis.js";

const buyerActionsSocket = (io, socket) => {
  return () => {
    socket.on("BID_UP", async (bidData) => {
      console.log("got bid data", bidData);
      console.log(socket.userID, socket.rooms);
      bidData.currentAmount += 1; // Increment currentAmount by 1
      bidData.time = Date.now();
      bidData.auctionInProgress = true;
      socket.join(bidData.auctionRoomID);
      
      // Using template literals for keys
      const currentBidKey = `currentBid-${bidData.auctionRoomID}`;
      const timerKey = `timer-${bidData.auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${bidData.auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${bidData.auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${bidData.auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${bidData.auctionRoomID}`;

      // Using try...catch block for error handling
      try {
        // Using multi to execute Redis commands atomically
        const multi = redisClient.multi();
        multi.set(currentBidKey, bidData.currentAmount);
        multi.set(timerKey, bidData.currentAmount);
        multi.set(currentBidderIDKey,bidData.currentBidderID);
        multi.set(currentBidderNameKey,bidData.currentBidderName)
        multi.set(currentBidderLogoKey,bidData.currentBidderLogo)
        multi.set(currentPlayerOrderKey,bidData.currentPlayerOrder)
        await multi.exec(); // Execute the multi commands

        console.log("send bid data", bidData);
        io.to(bidData.auctionRoomID).emit("BID_INC", bidData);
      } catch (error) {
        console.error("Error in Redis operation:", error);
        // Handle the error gracefully, perhaps by sending an error response back to the client
      }
    });
  };
};
export default buyerActionsSocket;
