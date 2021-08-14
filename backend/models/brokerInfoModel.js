import mongoose from 'mongoose';

const branchesSchema = mongoose.Schema({
	address: { type: String, required: true },
	phoneNumber: { type: Array, required: true },
});

const brokerInfoSchema = mongoose.Schema({
	brokerNumber: { type: Number, required: true },
	brokerName: { type: String, required: true },
	branches: [branchesSchema],
	website: { type: String, required: false },
});

const BrokerInfo = mongoose.model('BrokerInfo', brokerInfoSchema);
export default BrokerInfo;
