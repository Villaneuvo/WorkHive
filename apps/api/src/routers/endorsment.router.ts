import express from 'express';
import { createEndorsement, getUserEndorsements } from '@/controllers/endorsment.controller';

const router = express.Router();

router.post('/', createEndorsement);
router.get('/:id', getUserEndorsements);

export default router;