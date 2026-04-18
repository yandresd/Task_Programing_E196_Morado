import { Router } from 'express';
import { register } from '../controller/auth.controller.js';
import { login } from '../controller/auth.controller.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;