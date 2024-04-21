import { redisClient } from "../utils/redis.js";

const currentStateSocket = (io, socket) => {
  return () => {
    socket.on("GET_CURRENT_BID_INFO", async (roomData) => {
      console.log("got room data", roomData);
      console.log(socket.userID, socket.rooms);

      const auctionRoomID = roomData.auctionRoomID;
      const currentBidKey = `currentBid-${auctionRoomID}`;
      const timerKey = `timer-${auctionRoomID}`;
      const auctionInProcessKey = `auctionInProcess-${auctionRoomID}`;
      const currentBidderIDKey = `currentBidderID-${auctionRoomID}`;
      const currentBidderNameKey = `currentBidderName-${auctionRoomID}`;
      const currentBidderLogoKey = `currentBidderLogo-${auctionRoomID}`;
      const currentPlayerOrderKey = `currentPlayerOrder-${auctionRoomID}`;

      const keysExist = await checkKeyExistence([
        currentPlayerOrderKey,
        currentBidderIDKey,
        timerKey,
        currentBidKey,
        currentBidderNameKey,
        currentBidderLogoKey,
        auctionInProcessKey,
      ]);
      console.log("keysexist", keysExist);
      if (keysExist) {
        const multi = redisClient.multi();

        multi.get(currentBidKey);
        multi.get(timerKey);
        multi.get(currentBidderIDKey);
        multi.get(currentBidderNameKey);
        multi.get(currentBidderLogoKey);
        multi.get(currentPlayerOrderKey);
        multi.get(auctionInProcessKey);

        const [
          currentAmount,
          timer,
          currentBidderID,
          currentBidderName,
          currentBidderLogo,
          currentPlayerOrder,
          auctionInProcess,
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
        roomData.auctionInProcess = auctionInProcess[1];
        if (!currentPlayerOrder) {
          roomData.currentPlayerOrder = 1;
        } else {
          roomData.currentPlayerOrder = Number(currentPlayerOrder);
        }
      } else {
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
    socket.on("GET_BUYERS_INFO", async (buyerData) => {
      console.log("buyer data", buyerData);
      const roomID = buyerData.auctionRoomID;
      console.log("teams:", buyerData.teams); // ['mi','rcb'] create keys of this array elements like  'mi-purse-${roomID}' and 'rcb-purse-${roomID}'
  
      const multi = redisClient.multi();
      buyerData.teams.forEach((team) => {
          const buyerPurseKey = `${team.teamLogo}-purse-${roomID}`;
          const buyerBoughtPlayersCountKey = `${team.teamLogo}-playerCount-${roomID}`;
          multi.exists(buyerPurseKey);
          multi.exists(buyerBoughtPlayersCountKey); // Check if the key exists
      });
  
      const existenceResults = await multi.exec();
      console.log("existence", existenceResults);
      const keysExist = await checkExistense(existenceResults);
      console.log("keysExist", keysExist);
  
      if (keysExist) {
          const teams = buyerData.teams;
          buyerData.buyers = {};
          const multiGet = redisClient.multi();
          await Promise.all(
              teams.map(async (team) => {
                  // Use Promise.all() to await all promises in parallel
                  const buyerPurseKey = `${team.teamLogo}-purse-${roomID}`;
                  const buyerBoughtPlayersCountKey = `${team.teamLogo}-playerCount-${roomID}`;
                  multiGet.get(buyerPurseKey);
                  multiGet.get(buyerBoughtPlayersCountKey);
  
                  const [currentPurse, playersBoughtCount] = await multiGet.exec();
                  console.log('redis currentPurse:', currentPurse, playersBoughtCount)
                  buyerData.buyers[team.teamLogo] = {
                      currentPurse: Number(currentPurse[1]),
                      playersBoughtCount: Number(playersBoughtCount[1]),
                      teamLogo: team.teamLogo,
                  };
              })
          );
          console.log("redis byyyers:", buyerData);
      } else {
          //for this type of array teams=['mi','rcb'] , add data like this buyerData={mi:{currentPurse:50,playersBoughtCount:0,teamLogo:'mi'},csk:{currentPurse:50,playersBoughtCount:7,teamLogo:'mi'}}
          const teams = buyerData.teams;
          console.log("teams", teams);
          buyerData.buyers = {};
  
          const multiSet = redisClient.multi(); // Create a new multi command for setting initial data
          teams.forEach((team) => {
              // Add data for each team to the buyerData object
              console.log("team", team);
              buyerData.buyers[team.teamLogo] = {
                  currentPurse: 50,
                  playersBoughtCount: 0,
                  teamLogo: team.teamLogo,
              };
              const buyerPurseKey = `${team.teamLogo}-purse-${roomID}`;
              const buyerBoughtPlayersCountKey = `${team.teamLogo}-playerCount-${roomID}`;
              multiSet.set(buyerPurseKey, 50); // Use multiSet for setting initial data
              multiSet.set(buyerBoughtPlayersCountKey, 0); // Use multiSet for setting initial data
          });
          await multiSet.exec(); // Execute the set commands
          console.log("byyers:", buyerData);
      }
      io.to(socket.id).emit("BUYERS_INFO", buyerData);
  });
  
  };
};
export default currentStateSocket;

const checkKeyExistence = async (keys) => {
  const multi = redisClient.multi();

  keys.forEach((key) => {
    console.log("key:", key);
    multi.exists(key);
  });

  const existenceResults = await multi.exec();
  console.log("existense", existenceResults);

  for (let i = 0; i < existenceResults.length; i++) {
    if (existenceResults[i][1] === 0) {
      return false;
    }
  }

  return true;
};

const checkExistense = async (existenceResults) => {
  for (let i = 0; i < existenceResults.length; i++) {
    if (existenceResults[i][1] === 0) {
      console.log("false");
      return false;
    }
  }

  return true;
};
