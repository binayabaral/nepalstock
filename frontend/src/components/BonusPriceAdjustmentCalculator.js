import React, { useState } from 'react';

const BonusPriceAdjustmentCalculator = () => {
	const [price, setPrice] = useState(0);
	const [bonusPercent, setBonusPercent] = useState(0);
	const [newPrice, setNewPrice] = useState(0);

	return (
		<div className="form-wrapper">
			<h4>Calculate Bonus Share Adjusted Price</h4>
			<form>
				<div className="form-group">
					<label htmlFor="calculator__price-before-book-closure">Price before book closure: </label>
					<input
						type="number"
						id="calculator__price-before-book-closure"
						min="0"
						value={price}
						onChange={e => {
							setPrice(Number(e.target.value));
							setNewPrice(Number(e.target.value) / (1 + bonusPercent / 100));
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="calculator__bonus-percentage">Bonus (%): </label>
					<input
						type="number"
						id="calculator__bonus-percentage"
						min="0"
						value={bonusPercent}
						onChange={e => {
							setBonusPercent(Number(e.target.value));
							setNewPrice(price / (1 + Number(e.target.value) / 100));
						}}
					/>
				</div>
				<div className="form-group">
					<span className="label">Adjusted Price (Rs.): </span>
					<span className="result-field jade">{newPrice.toFixed(2)}</span>
				</div>
			</form>
		</div>
	);
};

export default BonusPriceAdjustmentCalculator;
