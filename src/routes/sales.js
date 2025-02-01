import express from 'express';
const router = express.Router();

import { allSales } from '../controllers/salesController.js';

// Endpoint untuk menampilkan semua penjualan
router.get('/', allSales);

export default router;
