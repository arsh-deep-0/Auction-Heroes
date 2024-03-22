import playerSocket from "./player.socket.js";
import auctionSocket from "./auction.socket.js";
import { verifyJWT } from "../middlewares/authSocket.middleware.js";

const initializeSocketIO = (io) => {
  return io
    .use((socket, next) => {
      verifyJWT(socket, next);
    })
    .on("connection", async (socket) => {
      try {
        // Access authenticated user ID attached to the socket
        const userID = socket.userID;
        console.log("Authenticated user connected with ID:", userID);

        socket.emit("newConnection", `hello user ${socket.id}`);
        console.log(`a user connected with id ${socket.id}`);

        playerSocket(io,socket)();
        auctionSocket(io,socket)();

        socket.on("disconnect", () => {
          console.log(`User ${userID} disconnected`);
        });
      } catch (error) {
        console.error("Socket connection error:", error);
      }
    });
};

export { initializeSocketIO };
