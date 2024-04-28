import { sellPlayerSocket } from "../controllers/player.controller.js";
import { redisClient } from "../utils/redis.js";

const buyerActionsSocket = (io, socket) => {
  return () => {
    socket.on("BID_UP", async (bidData) => {
      console.log("got bid data", bidData);
      console.log(socket.userID, socket.rooms);

      bidData.currentAmount = increaseBid(
        bidData.currentAmount,
        bidData.basePrice
      );
      bidData.time = Date.now();
      bidData.auctionInProcess = true;
      const auctionRoomID = bidData.auctionRoomID;
      socket.join(auctionRoomID);

      const currentBidInfoKey = `currentBidInfo-${auctionRoomID}`;
      await redisClient.set(currentBidInfoKey, JSON.stringify(bidData));
      const currentBidInfo = await redisClient.get(currentBidInfoKey);
      bidData = JSON.parse(currentBidInfo);
      console.log("sending updated", bidData);
      io.to(auctionRoomID).emit("BID_INC", bidData);
    });

    socket.on("SELL_PLAYER", async (sellingData) => {
      console.log("sellPlayer", sellingData);

      const auctionRoomID = sellingData.auctionRoomID;

      const currentBidInfoKey = `currentBidInfo-${auctionRoomID}`;

      const updatedCurrentBidInfo = {
        currentAmount: 0,
        timer: 45,
        auctionInProcess: false,
        currentBidderName: null,
        currentBidderLogo: null,
        currentPlayerOrder: Number(sellingData.currentPlayerOrder + 1),
        playersSold:sellingData.playersSold+1,
        playersUnsold:sellingData.playersUnsold,
      };
      await redisClient.set(
        currentBidInfoKey,
        JSON.stringify(updatedCurrentBidInfo)
      );
      io.to(auctionRoomID).emit("CURRENT_BID_INFO", updatedCurrentBidInfo);

      const buyersInfoKey = `buyersInfo-${auctionRoomID}`;
      const currentBuyersInfo = await redisClient.get(buyersInfoKey);

      const updatedBuyersInfo = JSON.parse(currentBuyersInfo);
      console.log("updatedBuyersInfo:", updatedBuyersInfo);

      console.log("buyerLogo", sellingData.buyerLogo);

      const buyingTeam = updatedBuyersInfo.find(
        (team) => team.teamLogo === sellingData.buyerLogo
      );

      console.log("buyINGTeam:", buyingTeam);

      console.log(sellingData.sellingAmount);
      if (buyingTeam) {
        buyingTeam.currentPurse =
          Number(buyingTeam.currentPurse) - Number(sellingData.sellingAmount);
          
          if(sellingData.sellingAmount>0){
            buyingTeam.playersBoughtCount =
            Number(buyingTeam.playersBoughtCount) + 1;
          }else if(sellingData.sellingAmount<0){
            buyingTeam.playersBoughtCount =
            Number(buyingTeam.playersBoughtCount) - 1;
          }
       

        await redisClient.set(buyersInfoKey, JSON.stringify(updatedBuyersInfo));
        io.to(auctionRoomID).emit("BUYERS_INFO", updatedBuyersInfo)
        console.log("player selling data:", sellingData);

        await sellPlayerSocket(sellingData);
      }else{

      }
    });

    socket.on("SKIP_PLAYER", async (sellingData) => {
      const auctionRoomID = sellingData.auctionRoomID;
      const currentBidInfoKey = `currentBidInfo-${auctionRoomID}`;

      const updatedCurrentBidInfo = {
        currentAmount: 0,
        timer: 45,
        auctionInProgress: false,
        currentBidderName: null,
        currentBidderLogo: null,
        currentPlayerOrder: Number(sellingData.currentPlayerOrder + 1),
        playersSold:sellingData.playersSold,
        playersUnsold:sellingData.playersUnsold+1
      };
      await redisClient.set(
        currentBidInfoKey,
        JSON.stringify(updatedCurrentBidInfo)
      );
      console.log("skipped player", updatedCurrentBidInfo);
      io.to(auctionRoomID).emit("CURRENT_BID_INFO", updatedCurrentBidInfo);
    });
  };
};
export default buyerActionsSocket;

function increaseBid(amount, basePrice) {
  amount = amount * 10;
  if (amount == 0) {
    return basePrice;
  }
  if (amount < 100) {
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
