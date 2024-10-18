import { Router } from 'express';
import { getAllPosts } from '@/controllers/jobPost.controller';

const router = Router();

router.get('/', getAllPosts);

export default router;