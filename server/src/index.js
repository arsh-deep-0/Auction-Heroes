import dotenv from "dotenv/config";
import connectDB from "./db/index.js";
import { httpServer } from "./app.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { Auction } from "./models/auction.model.js";

const port = process.env.PORT || 8081;

connectDB()
  .then(
    httpServer.listen(port, () => {
      console.log(`app listening on port ${port}`);
    })
  )
  .catch((error) => {
    console.log("MongoDB connection Failed!", error);
  });


  
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// const playerData = {
//   playerName: "Kajal Soni",
//   battingPoints: 57,
//   bowlingPoints: 21,
//   wkPoints: 71,
// };

// app.get("/api/playerData", (req, res) => {
//   res.send(playerData);
// });
