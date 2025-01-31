import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import marketingRoute from './routes/marketing.js';

dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/v1/marketings', marketingRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
