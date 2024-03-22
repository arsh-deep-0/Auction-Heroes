import { Router } from "express";
import { createTeam ,getTeamAnalytics} from "../controllers/team.controller.js";



const router = new Router();

router.route('/create').post(createTeam)
router.route('/analytics/:name').get(getTeamAnalytics)


export default router;