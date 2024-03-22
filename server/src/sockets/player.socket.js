import {
  getAllplayers,
  sellPlayerSocket,
} from "../controllers/player.controller.js";

const playerSocket = (io,socket) => {
  return () => {
    socket.on("get-all-players", async({auctionRoomID}) => {
      console.log(auctionRoomID) 
      const players = await getAllplayers(socket,auctionRoomID);
      socket.emit("all-players", players);
    });

    socket.on("sellPlayer", async (data) => {
      console.log("hi", data);
      const soldData = await sellPlayerSocket(socket, data);
      socket.emit("playerSold", soldData);
    });

    socket.on("getPlayer", async (data) => {});
  };
};

export default playerSocket;
