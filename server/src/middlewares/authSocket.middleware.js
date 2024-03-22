import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (socket, next) => {
  try {
    const token = socket.handshake.query.accessToken;
    //const token = socket.handshake.auth.accessToken;
    console.log("token: ", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
 
    socket.userID = user._id; // Attach userID to the socket

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { verifyJWT };
