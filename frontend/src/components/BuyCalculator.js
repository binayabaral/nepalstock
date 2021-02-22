import React, { useState } from 'react';

const BuyCalculator = () => {
	const [buyQuantity, setBuyQuantity] = useState(0);
	const [buyPrice, setBuyPrice] = useState(0);
	const [buyCostPrice, setBuyCostPrice] = useState(0);

	const calculateBrokerCommissionPercentage = price => {
		if (price > 0 && price <= 50000) {
			return 0.4;
		} else if (price > 50000 && price <= 500000) {
			return 0.37;
		} else if (price > 500000 && price <= 2000000) {
			return 0.34;
		} else if (price > 2000000 && price <= 10000000) {
			return 0.3;
		} else if (price > 10000000) {
			return 0.27;
		} else {
			return 0;
		}
	};

	return (
		<div className="form-wrapper">
			<h4>Calculate Net Buying Price</h4>
			<form>
				<div className="form-group">
					<label htmlFor="calculator__buy--quantity">Share Quantity: </label>
					<input
						type="number"
						id="calculator__buy--quantity"
						min="0"
						value={buyQuantity}
						onChange={e => {
							setBuyQuantity(Number(e.target.value));
							setBuyCostPrice(Number(e.target.value) * buyPrice);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="calculator__buy--price">Share Price (Rs.): </label>
					<input
						type="number"
						id="calculator__buy--price"
						min="0"
						value={buyPrice}
						onChange={e => {
							setBuyPrice(Number(e.target.value));
							setBuyCostPrice(buyQuantity * Number(e.target.value));
						}}
					/>
				</div>
				<div className="form-group">
					<span className="label">Total Cost (Rs.): </span>
					<span className="result-field">{buyCostPrice.toFixed(2)}</span>
				</div>
				<div className="form-group">
					<span className="label">Broker Commission (%): </span>
					<span className="result-field">{calculateBrokerCommissionPercentage(buyCostPrice)} %</span>
				</div>
				<div className="form-group">
					<span className="label">Broker Commission (Rs.): </span>
					<span className="result-field">{((calculateBrokerCommissionPercentage(buyCostPrice) * buyCostPrice) / 100).toFixed(2)}</span>
				</div>
				<div className="form-group">
					<span className="label">Sebon Fee (%): </span>
					<span className="result-field">{0.015} %</span>
				</div>
				<div className="form-group">
					<span className="label">Sebon Fee (Rs.): </span>
					<span className="result-field">{((0.015 * buyCostPrice) / 100).toFixed(2)}</span>
				</div>
				<div className="form-group">
					<span className="label">DP Change Charge (Rs.): </span>
					<span className="result-field">{25}</span>
				</div>
				<div className="form-group">
					<span className="label">Total Amount to pay (Rs.): </span>
					<span className="result-field jade">{buyCostPrice > 0 ? (buyCostPrice + (calculateBrokerCommissionPercentage(buyCostPrice) * buyCostPrice) / 100 + (0.015 * buyCostPrice) / 100 + 25).toFixed(2) : 0}</span>
				</div>
				<div className="form-group">
					<span className="label">Price Per Share (Rs.): </span>
					<span className="result-field jade">{buyCostPrice > 0 ? ((buyCostPrice + ((calculateBrokerCommissionPercentage(buyCostPrice) * buyCostPrice) / 100 + (0.015 * buyCostPrice) / 100 + 25)) / buyQuantity).toFixed(2) : 0}</span>
				</div>
			</form>
		</div>
	);
};

export default BuyCalculator;
