import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { content } from '../data/currentPriceData.js';
import currentPrice from '../models/todaysPriceModel.js';
import connectDB from '../config/db.js';

// dotenv.config();
// connectDB();

const importData = async data => {
	try {
		await currentPrice.insertMany(data);
		console.log('Data Imported!'.green.inverse);
		// process.exit(1);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		// process.exit(1);
	}
};

export const getCurrentPrice = async () => {
	const url = 'https://newweb.nepalstock.com/api/nots/nepse-data/today-price?size=300';
	try {
		const {
			data: { content },
		} = await axios.get(url);
		deleteData();
		importData(content);
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async () => {
	try {
		await currentPrice.deleteMany();
		console.log('Data Deleted!'.red.inverse);
		// process.exit(1);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		// process.exit(1);
	}
};
