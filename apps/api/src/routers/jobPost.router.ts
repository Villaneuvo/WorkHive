import { Router } from 'express';
import { register } from 'tsconfig-paths';
import { createJobPost, getAllJobPostsByAdmin } from '@/controllers/jobPost.controller';

const router = Router();

router.post('/', createJobPost);
router.get('/:adminId', getAllJobPostsByAdmin);

export default router;
