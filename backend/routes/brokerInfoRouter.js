import express from 'express';
import asynchandler from 'express-async-handler';
const router = express.Router();
import BrokerInfo from '../models/brokerInfoModel.js';

//@description    Fetch Broker Info
//@route          GET /api/broker-info
//@access         Public
router.get(
  '/',
  asynchandler(async (req, res) => {
    const brokerInfo = await BrokerInfo.find();
    res.json(brokerInfo);
  })
);

export default router;
