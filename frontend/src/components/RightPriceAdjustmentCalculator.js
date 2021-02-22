import React, { useState } from 'react';

const RightPriceAdjustmentCalculator = () => {
	const [price, setPrice] = useState(0);
	const [rightPercent, setRightPercent] = useState(0);
	const [faceValue, setFacevalue] = useState(100);
	const [newPrice, setNewPrice] = useState(0);

	return (
		<div className="form-wrapper">
			<h4>Calculate Right Share Adjusted Price</h4>
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
							setNewPrice(Number(e.target.value) / (1 + rightPercent / 100));
							setNewPrice((Number(e.target.value) + (faceValue * rightPercent) / 100) / (1 + rightPercent / 100));
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="calculator__right-percentage">Bonus (%): </label>
					<input
						type="number"
						id="calculator__right-percentage"
						min="0"
						value={rightPercent}
						onChange={e => {
							setRightPercent(Number(e.target.value));
							setNewPrice((price + (faceValue * Number(e.target.value)) / 100) / (1 + Number(e.target.value) / 100));
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="calculator__bonus-percentage">Face Value: </label>
					<select
						onChange={e => {
							setFacevalue(e.target.value);
							setNewPrice((price + (Number(e.target.value) * rightPercent) / 100) / (1 + rightPercent / 100));
						}}
					>
						<option value="100" selected>
							100
						</option>
						<option value="10">10</option>
					</select>
				</div>
				<div className="form-group">
					<span className="label">Adjusted Price (Rs.): </span>
					<span className="result-field jade">{newPrice.toFixed(2)}</span>
				</div>
			</form>
		</div>
	);
};

export default RightPriceAdjustmentCalculator;
