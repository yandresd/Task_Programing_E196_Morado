import { Router } from 'express';
const router = Router();
import { createTeam } from '../controller/team.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.post('/createTeam', verifyToken, createTeam);

export default router;