import { Router } from 'express';
import { login, signup, profile, updateProfile } from '../controllers/auth.controller';
import { authenticated } from '../middlewares/authenticated';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/profile', authenticated, profile);
router.patch('/profile', authenticated, updateProfile);

export default router;
