import { Router } from 'express';
import { createTeam, searchTeams } from '../controller/team.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/createTeam', createTeam);
router.post('/searchTeams', searchTeams);

export default router;