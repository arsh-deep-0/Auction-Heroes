import { Router } from "express";
import { createAuction, getHostByRoomID } from "../controllers/auction.controller.js";

const router = new Router();

router.route("/create").post(createAuction);

router.route("/getHost/:roomID").get(getHostByRoomID)
export default router;
