import axios from 'axios';
import express from 'express';
import asynchandler from 'express-async-handler';
const router = express.Router();

//@description    Fetch Broker Info
//@route          GET /api/proxy
//@access         Public
router.get(
	'/',
	asynchandler(async (req, res) => {
		const url = req.query.url;
		try {
			const { data } = await axios.get(url);
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	})
);

export default router;
