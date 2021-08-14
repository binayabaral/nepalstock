import mongoose from 'mongoose';

const currentPriceSchema = mongoose.Schema({
	id: { type: Number, required: true },
	businessDate: { type: Date, required: true },
	securityId: { type: Number, required: true },
	symbol: { type: String, required: true },
	securityName: { type: String, required: true },
	openPrice: { type: Number, required: true },
	highPrice: { type: Number, required: true },
	lowPrice: { type: Number, required: true },
	totalTradedQuantity: { type: Number, required: true },
	totalTradedValue: { type: Number, required: true },
	previousDayClosePrice: { type: Number, required: true },
	fiftyTwoWeekHigh: { type: Number, required: true },
	fiftyTwoWeekLow: { type: Number, required: true },
	lastUpdatedTime: { type: Date, required: true },
	lastUpdatedPrice: { type: Number, required: true },
	totalTrades: { type: Number, required: true },
});

const CurrentPrice = mongoose.model('CurrentPrice', currentPriceSchema);
export default CurrentPrice;
