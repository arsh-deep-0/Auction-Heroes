import { redisClient } from "../utils/redis.js";

const buyerActionsSocket = (io, socket) => {
  return () => {
    socket.on("BID_UP", async (bidData) => {
      console.log("got bid data", bidData);
      console.log(socket.userID, socket.rooms);
      bidData.currentAmount = increaseBid(bidData.currentAmount);
      bidData.time = Date.now();
      bidData.auctionInProcess = true;
      socket.join(bidData.auctionRoomID);

      // Using template literals for keys
      const currentBidKey = `currentBid-${bidData.auctionRoomID}`;
      const timerKey = `timer-${bidData.auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${bidData.auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${bidData.auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${bidData.auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${bidData.auctionRoomID}`;

      try {
        // Using multi to execute Redis commands atomically
        const multi = redisClient.multi();
        multi.set(currentBidKey, bidData.currentAmount);
        multi.set(timerKey, bidData.currentAmount);
        multi.set(currentBidderIDKey, bidData.currentBidderID);
        multi.set(currentBidderNameKey, bidData.currentBidderName);
        multi.set(currentBidderLogoKey, bidData.currentBidderLogo);
        multi.set(currentPlayerOrderKey, bidData.currentPlayerOrder);
        await multi.exec();
        console.log("send bid data", bidData);
        io.to(bidData.auctionRoomID).emit("BID_INC", bidData);
      } catch (error) {
        console.error("Error in Redis operation:", error);
      }
    });

    socket.on("SELL_PLAYER", async (sellingData) => {
      console.log('sellPlayer',sellingData)
      const buyerPurseKey = `${sellingData.buyerLogo}-purse-${sellingData.auctionRoomID}`;
      const buyerBoughtPlayersCountKey = `${sellingData.buyerLogo}-playerCount-${sellingData.auctionRoomID}`;
      const currentBidKey = `currentBid-${sellingData.auctionRoomID}`;
      const timerKey = `timer-${sellingData.auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${sellingData.auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${sellingData.auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${sellingData.auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${sellingData.auctionRoomID}`;

      const multi = redisClient.multi();

      multi.get(buyerPurseKey);
      multi.get(buyerBoughtPlayersCountKey);

      const [buyerPurse, buyerBoughtPlayersCount] = await multi.exec();
      console.log('buyerPurse',buyerPurse,buyerBoughtPlayersCount)

      multi.set(buyerPurseKey, buyerPurse - sellingData.sellingPrice);
      multi.set(buyerBoughtPlayersCountKey, buyerBoughtPlayersCount + 1);
      multi.set(currentBidKey, 0);
      multi.set(timerKey, 0);
      multi.set(currentBidderIDKey,null);
      multi.set(currentBidderNameKey,null); 
      multi.set(currentBidderLogoKey,null);
      multi.set(currentPlayerOrderKey,sellingData.currentPlayerOrder+1);

      multi.exec();

      const soldData = {
        currentPurse: buyerPurse - sellingData.sellingPrice,
        playersBoughtCount: buyerBoughtPlayersCount + 1,
        auctionRoomID: sellingData.auctionRoomID,
        buyerLogo: sellingData.buyerLogo,
      };
      io.to(sellingData.auctionRoomID).emit("PLAYER_SOLD", soldData);
    });
  };
};
export default buyerActionsSocket;

function increaseBid(amount) {
  amount = amount * 10;
  if (amount < 1000) {
    let last_dig = amount % 10;
    if (last_dig == 2 || last_dig == 5) {
      amount = amount + 3;
    } else {
      amount = amount + 2;
    }
  } else {
    amount = amount + 5;
  }
  return amount / 10;
}
