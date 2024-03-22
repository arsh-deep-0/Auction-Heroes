import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { initializeSocketIO } from "./sockets/index.socket.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.set("io", io);
initializeSocketIO(io);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import auctionRulesRouter from "./routes/auctionRules.routes.js";
import playerRouter from "./routes/player.routes.js";
import teamRouter from "./routes/team.routes.js";
import auctionRouter from "./routes/auction.routes.js";

//routes declarations
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auction-rules", auctionRulesRouter);
app.use("/api/v1/player", playerRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/auction", auctionRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

export { httpServer };
