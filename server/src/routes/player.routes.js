import { Router } from "express";
import { createPlayer, getAllBoughtPlayers, getAllBoughtPlayersReq, getPlayerByOrder, sellPlayer } from "../controllers/player.controller.js";



const router = new Router();

router.route('/create').post(createPlayer)

router.route('/sell').post(sellPlayer)

router.route('/get/:order').get(getPlayerByOrder)

router.route('/getAllPlayers/:auctionRoomID/:teamLogo').get(getAllBoughtPlayersReq)

export default router;