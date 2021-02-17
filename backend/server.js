import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import exchangeRateRoute from './routes/exchangeRateRouter.js';
import currentPriceRoute from './routes/currentPriceRouter.js';
import brokerInfoRouter from './routes/brokerInfoRouter.js';

import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/exchange-rate', exchangeRateRoute);
app.use('/api/current-price', currentPriceRoute);
app.use('/api/broker-info', brokerInfoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
