import { Router } from "express";
import {
  getFullName,
  getUserName,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js"; 

const router = new Router();

router.route("/register").post(
  // upload.single("profileImage"),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/getUserName/:userID").get(getUserName)
router.route("/getFullName/:userID").get(getFullName)

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
