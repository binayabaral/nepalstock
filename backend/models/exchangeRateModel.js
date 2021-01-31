import mongoose from 'mongoose';

const currencySchema = mongoose.Schema({
	name: { type: String, required: true },
	unit: { type: Number, required: true },
	buy: { type: Number },
	sell: { type: Number },
});

const exchangeRateSchema = mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
			unique: true,
		},
		INR: [currencySchema],
		USD: [currencySchema],
		EUR: [currencySchema],
		GBP: [currencySchema],
		CHF: [currencySchema],
		AUD: [currencySchema],
		CAD: [currencySchema],
		SGD: [currencySchema],
		JPY: [currencySchema],
		CNY: [currencySchema],
		SAR: [currencySchema],
		QAR: [currencySchema],
		THB: [currencySchema],
		AED: [currencySchema],
		MYR: [currencySchema],
		KRW: [currencySchema],
		SEK: [currencySchema],
		DKK: [currencySchema],
		HKD: [currencySchema],
		KWD: [currencySchema],
		BHD: [currencySchema],
	},
	{ timestamps: true }
);

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);
export default ExchangeRate;
