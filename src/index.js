import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import marketingsRoute from './routes/marketing.js';
import paymentsRoute from './routes/payment.js';
import salesRoute from './routes/sales.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/v1/marketings', marketingsRoute);
app.use('/v1/payments', paymentsRoute);
app.use('/v1/sales', salesRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
