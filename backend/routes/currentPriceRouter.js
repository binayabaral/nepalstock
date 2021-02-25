import express from 'express';
import asynchandler from 'express-async-handler';
const router = express.Router();
import CurrentPrice from '../models/todaysPriceModel.js';

import { getCurrentPrice } from '../seeders/currentPriceSeeder.js';

//@description    Fetch Today's Exchange Rate
//@route          GET /api/current-price
//@access         Public
router.get(
	'/',
	asynchandler(async (req, res) => {
		const todaysRate = await CurrentPrice.find();
		res.json(todaysRate);
	})
);

//@description    Update Todays Rate
//@route          GET /api/current-price/update-stock-prices
//@access         Public
router.get(
	'/update-stock-prices',
	asynchandler(async (req, res) => {
		try {
			await getCurrentPrice();
			res.json({ message: 'SUCCESSFUL' });
		} catch (eror) {
			res.status(404).json({ message: 'ERROR' });
		}
	})
);

export default router;
