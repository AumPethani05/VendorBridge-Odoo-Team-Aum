import express from 'express';
import { createVendor, getVendors, getRFQDetails, getComparison } from '../controllers/procurement.controller';

const router = express.Router();

router.get('/vendors', getVendors);
router.post('/vendors', createVendor);
router.get('/rfqs/:id', getRFQDetails);
router.get('/rfqs/:id/comparison', getComparison);

export default router;
