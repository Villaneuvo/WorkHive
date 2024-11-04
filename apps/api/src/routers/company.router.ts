import express from 'express';
import { submitRating } from '@/controllers/company.controller';

const router = express.Router();

router.post('/:adminId/rate', submitRating);

export default router;
