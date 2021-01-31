import express from 'express';
import asynchandler from 'express-async-handler';
const router = express.Router();
import ExchangeRate from '../models/exchangeRateModel.js';

import { getTodaysRate } from '../seeders/exchangeRateSeeder.js';

//@description    Fetch Today's Exchange Rate
//@route          GET /api/exchange-rate
//@access         Public
router.get(
	'/',
	asynchandler(async (req, res) => {
		const todaysRate = await ExchangeRate.find().sort({ date: -1 }).limit(1);
		res.json(todaysRate);
	})
);

//@description    Fetch Historic Exchange Rate
//@route          GET /api/exchange-rate/historic
//@access         Public
router.get(
	'/historic',
	asynchandler(async (req, res) => {
		const rates = await ExchangeRate.find().sort({ date: -1 }).limit(30);
		res.json(rates);
	})
);

//@description    Fetch Historic Exchange Rate
//@route          GET /api/exchange-rate/historic/:time
//@access         Public
router.get(
	'/historic/:time',
	asynchandler(async (req, res) => {
		const rates = await ExchangeRate.find().sort({ date: -1 }).limit(Number(req.params.time));
		res.json(rates);
	})
);

//@description    Update Todays Rate
//@route          GET /api/exchange-rate/updateRate
//@access         Public
router.get(
	'/updateRate',
	asynchandler(async (req, res) => {
		try {
			const rate = await getTodaysRate();
			res.json(rate);
		} catch (eror) {
			res.status(404).json({ message: 'ERROR' });
		}
	})
);

export default router;
