import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

const router = new Router();

router.route("/register").post(
  upload.single("profileImage"),
  registerUser,
  (req) => {
    const profileImagePath = req.files?.path;
    console.log(profileImagePath)
      // Delete files from file system
      fs.unlink(profileImagePath, (err) => {
        if (err) {
          console.error("Error deleting profile image:", err);
        }
      });
    
  }
);

router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
