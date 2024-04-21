import { redisClient } from "../utils/redis.js";

const buyerActionsSocket = (io, socket) => {
  return () => {
    socket.on("BID_UP", async (bidData) => {
      console.log("got bid data", bidData);
      console.log(socket.userID, socket.rooms);
      bidData.currentAmount = increaseBid(bidData.currentAmount);
      bidData.time = Date.now();
      bidData.auctionInProcess = true;
      const auctionRoomID = bidData.auctionRoomID;
      socket.join(auctionRoomID);

      // Using template literals for keys
      const currentBidKey = `currentBid-${auctionRoomID}`;
      const timerKey = `timer-${auctionRoomID}`;
      const auctionInProcessKey = `auctionInProcess-${auctionRoomID}`; 
      const currentBidderIDKey = `currentBidderID-${auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${auctionRoomID}`;

      try {
        // Using multi to execute Redis commands atomically
        const multi = redisClient.multi();
        multi.set(currentBidKey, bidData.currentAmount);
        multi.set(timerKey, bidData.currentAmount);
        multi.set(currentBidderIDKey, bidData.currentBidderID);
        multi.set(currentBidderNameKey, bidData.currentBidderName);
        multi.set(currentBidderLogoKey, bidData.currentBidderLogo);
        multi.set(currentPlayerOrderKey, bidData.currentPlayerOrder);
        multi.set(auctionInProcessKey, bidData.auctionInProcess); 
        await multi.exec();
        console.log("send bid data", bidData);
        io.to(auctionRoomID).emit("BID_INC", bidData);
      } catch (error) {
        console.error("Error in Redis operation:", error);
      }
    });

    socket.on("SELL_PLAYER", async (sellingData) => {
      console.log('sellPlayer',sellingData)
      const auctionRoomID=sellingData.auctionRoomID;
      const buyerPurseKey = `${sellingData.buyerLogo}-purse-${auctionRoomID}`;
      const buyerBoughtPlayersCountKey = `${sellingData.buyerLogo}-playerCount-${auctionRoomID}`;
      const currentBidKey = `currentBid-${auctionRoomID}`;
      const timerKey = `timer-${auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${auctionRoomID}`;

      const multi = redisClient.multi();

      multi.get(buyerPurseKey);
      multi.get(buyerBoughtPlayersCountKey);

      const [buyerPurse, buyerBoughtPlayersCount] = await multi.exec();
      console.log('buyerPurse',buyerPurse,buyerBoughtPlayersCount)

      multi.set(buyerPurseKey, Number(buyerPurse[1]) - Number(sellingData.sellingAmount));
      multi.set(buyerBoughtPlayersCountKey, Number(buyerBoughtPlayersCount[1]) + 1);
      multi.set(currentBidKey, 0);
      multi.set(timerKey, 0);
      multi.set(currentBidderIDKey,null);
      multi.set(currentBidderNameKey,null); 
      multi.set(currentBidderLogoKey,null);
      multi.set(currentPlayerOrderKey,sellingData.currentPlayerOrder+1);

      multi.exec();

      const soldData = {
        currentPurse: Number(buyerPurse[1]) - Number(sellingData.sellingAmount),
        playersBoughtCount: Number(buyerBoughtPlayersCount[1]) + 1,
        auctionRoomID: auctionRoomID,
        buyerLogo: sellingData.buyerLogo,
        currentPlayerOrder:Number(sellingData.currentPlayerOrder)+1
      };

      console.log('player selling data:',soldData);
      io.to(auctionRoomID).emit("PLAYER_SOLD", soldData);
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
