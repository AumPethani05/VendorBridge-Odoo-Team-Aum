import express from 'express';
import { getVendors, getRFQDetails, getComparison } from '../controllers/procurement.controller';

const router = express.Router();

router.get('/vendors', getVendors);
router.get('/rfqs/:id', getRFQDetails);
router.get('/rfqs/:id/comparison', getComparison);

export default router;
