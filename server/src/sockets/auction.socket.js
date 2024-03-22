import {
  addBuyerToAuction,
  removeBuyerFromAuction,
} from "../controllers/auction.controller.js";

const auctionSocket = (io,socket) => {
  return () => {
    socket.on("addBuyerToAuction", async (joiningData) => {
      try {
        const result = await addBuyerToAuction(socket , joiningData);
        console.log(socket.rooms);
        io.to(`${joiningData.waitingRoomID}`).emit("addBuyerToAuctionResult", result);
      } catch (error) {
        console.error("Error in addBuyerToAuction:", error);
      }
    });

    socket.on("removeBuyerFromAuction", async (removingData) => {
      try {
        const result = await removeBuyerFromAuction(socket, removingData);
        io.to(`${joiningData.waitingRoomID}`).emit("removeBuyerFromAuctionResult", result);
      } catch (error) {
        console.error("Error in removeBuyerFromAuction:", error);
      }
    });


  };
};

export default auctionSocket;
