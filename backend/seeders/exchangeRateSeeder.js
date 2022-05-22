import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import payload from '../data/testData.js';
import ExchangeRate from '../models/exchangeRateModel.js';
import connectDB from '../config/db.js';

// dotenv.config();
// connectDB();

const transformToSchema = data => {
  let transformedData = [];
  for (let i = 0; i < data.length; i++) {
    let dataObject = {};
    const currentData = data[i];
    dataObject.date = currentData.date;
    for (let j = 0; j < currentData.rates.length; j++) {
      const currentRate = currentData.rates[j];
      dataObject[currentRate.currency.iso3] = {
        name: currentRate.currency.name,
        unit: currentRate.currency.unit,
        buy: Number(currentRate.buy),
        sell: Number(currentRate.sell)
      };
    }
    transformedData.push(dataObject);
  }
  return transformedData;
};

const importData = async data => {
  try {
    await ExchangeRate.insertMany(data);
    console.log('Data Imported!'.green.inverse);
    // process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    // process.exit(1);
  }
};

export const getTodaysRate = async () => {
  const today = new Date().toJSON().slice(0, 10);
  const url = `https://www.nrb.org.np/api/forex/v1/rates?per_page=100&from=${today}&to=${today}&page=1`;
  try {
    const {
      data: { data }
    } = await axios.get(url);
    const transformedData = transformToSchema(data.payload);
    importData(transformedData.reverse());
    return transformedData;
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await ExchangeRate.deleteMany();
    console.log('Data Deleted!'.red.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// getTodaysRate();
// deleteData();

const allSeeder = () => {
  for (let i = 2016; i <= 2020; i++) {
    for (let j = 1; j <= 12; j++) {
      if (i === 2020 && j === 2) {
        continue;
      }
      const startDate = `${i}-${j.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-01`;
      const endDate = `${i}-${j.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-31`;
      getTodaysRate(startDate, endDate);
    }
  }
  // process.exit(1);
};

// allSeeder();
