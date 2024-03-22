import { Router } from "express";
import { createAuction } from "../controllers/auction.controller.js";



const router = new Router();

router.route('/create').post(createAuction)

export default router;