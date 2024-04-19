import { Router } from "express";
import { createTeam ,getAllTeamsByRoomID,getTeamAnalytics} from "../controllers/team.controller.js";



const router = new Router();

router.route('/create').post(createTeam)
router.route('/analytics/:name').get(getTeamAnalytics)
router.route('/getAllTeams/:roomID').get(getAllTeamsByRoomID)  


export default router;