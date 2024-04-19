import { Router } from "express";
import { createPlayer, getPlayerByOrder, sellPlayer } from "../controllers/player.controller.js";



const router = new Router();

router.route('/create').post(createPlayer)

router.route('/sell').post(sellPlayer)

router.route('/get/:order').get(getPlayerByOrder)

export default router;