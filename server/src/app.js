import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { initializeSocketIO } from "./sockets/index.socket.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
  connectionStateRecovery: {},
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.set("io", io);
initializeSocketIO(io);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//routes import
import userRouter from "./routes/user.routes.js";
import auctionRulesRouter from "./routes/auctionRules.routes.js";
import playerRouter from "./routes/player.routes.js";
import teamRouter from "./routes/team.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";


app.use((req,res,next)=>{
  console.log('path: ',req.path)
  if(req.path.startsWith("/api/v1/users")|| req.path=='/'){
    next()
  }else{
    verifyJWT(req,res,next)
  }
})

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
