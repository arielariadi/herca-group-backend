import express from 'express';
const router = express.Router();

import {
	creditPayments,
	paymentsHistory,
} from '../controllers/paymentsController.js';

// Endpoint untuk melakukan pembayaran kredit
router.post('/', creditPayments);
router.get('/payments-history', paymentsHistory);

export default router;
