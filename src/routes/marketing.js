import express from 'express';
const router = express.Router();

import { marketingCommision } from '../controllers/marketingController.js';

// Endpoint untuk menampilkan komisi dari setiap marketing dengan ketentuan yang ada
router.get('/', marketingCommision);

export default router;
