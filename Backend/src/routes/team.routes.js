import { Router } from 'express';
import { createTeam } from '../controller/team.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/createTeam', verifyToken, createTeam);

export default router;