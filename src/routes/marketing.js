import express from 'express';
const router = express.Router();

import { marketingsCommisions } from '../controllers/marketingsController.js';

// Endpoint untuk menampilkan komisi dari setiap marketing dengan ketentuan yang ada
router.get('/', marketingsCommisions);

export default router;
