import { adminRegister, userRegister } from '@/controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.post('/register', userRegister);
router.post('/admin/register', adminRegister);

export default router;
