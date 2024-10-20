import { Router } from 'express';
import { getAllCompanies, getAllJobPostsByAdmin, getAllPosts, getCompanyById, getPostById } from '@/controllers/jobPost.controller';

const router = Router();

router.get('/', getAllPosts);
router.get('/company/', getAllCompanies)
router.get('/:id', getPostById);
router.get('/company/:id', getCompanyById);
router.get('/job/:adminId', getAllJobPostsByAdmin);

export default router;