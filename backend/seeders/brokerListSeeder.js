import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { brokers } from '../data/brokerList.js';
import BrokerInfo from '../models/brokerInfoModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const importData = async data => {
  try {
    await BrokerInfo.insertMany(data);
    console.log('Data Imported!'.green.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
importData(brokers);

const deleteData = async () => {
  try {
    await BrokerInfo.deleteMany();
    console.log('Data Deleted!'.red.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
