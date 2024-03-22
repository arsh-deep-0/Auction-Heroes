import { Router } from "express";
import { createPlayer, sellPlayer } from "../controllers/player.controller.js";



const router = new Router();

router.route('/create').post(createPlayer)

router.route('/sell').post(sellPlayer)

export default router;