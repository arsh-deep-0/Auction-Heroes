import { Router } from "express";
import { createAuctionRules } from "../controllers/auctionRules.controller.js";


const router = new Router();

router.route('/create').post(createAuctionRules)

export default router;