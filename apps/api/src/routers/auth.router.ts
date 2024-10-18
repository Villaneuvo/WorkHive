import express from 'express';
import { register } from 'tsconfig-paths';

const router = express.Router();

router.post('/register', register);

export default router;