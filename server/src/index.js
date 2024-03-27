import dotenv from "dotenv/config";
import connectDB from "./db/index.js";
import { httpServer } from "./app.js"; 

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



