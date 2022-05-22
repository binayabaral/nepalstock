import React, { useState } from 'react';

const SellCalculator = () => {
  const [quantity, setquantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [totalCostPrice, setTotalCostPrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);

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

  const getGainTax = () => {
    const netBuyingPrice =
      totalCostPrice +
      (calculateBrokerCommissionPercentage(totalCostPrice) * totalCostPrice) / 100 +
      (0.015 * totalCostPrice) / 100 +
      25;
    const netSellingPrice =
      totalSellingPrice -
      (calculateBrokerCommissionPercentage(totalSellingPrice) * totalSellingPrice) / 100 -
      (0.015 * totalSellingPrice) / 100 -
      25;

    if (netBuyingPrice < netSellingPrice) {
      return ((netSellingPrice - netBuyingPrice) * 0.05).toFixed(2);
    } else {
      return 0;
    }
  };

  const getProfit = () => {
    const netBuyingPrice =
      totalCostPrice +
      (calculateBrokerCommissionPercentage(totalCostPrice) * totalCostPrice) / 100 +
      (0.015 * totalCostPrice) / 100 +
      25;
    const netSellingPrice =
      totalSellingPrice -
      (calculateBrokerCommissionPercentage(totalSellingPrice) * totalSellingPrice) / 100 -
      (0.015 * totalSellingPrice) / 100 -
      25 -
      getGainTax();
    if (netBuyingPrice > 0 && netSellingPrice > 0) {
      return [
        netSellingPrice - netBuyingPrice,
        (((netSellingPrice - netBuyingPrice) / netBuyingPrice) * 100).toFixed(2)
      ];
    } else {
      return [0, 0];
    }
  };

  return (
    <div className="form-wrapper">
      <h4>Calculate Net Selling Price</h4>
      <form>
        <div className="form-group">
          <label htmlFor="calculator__sell--quantity">Share Quantity: </label>
          <input
            type="number"
            id="calculator__sell--quantity"
            min="0"
            value={quantity}
            onChange={e => {
              setquantity(Number(e.target.value));
              setTotalCostPrice(Number(e.target.value) * sellPrice);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="calculator__sell--buy-price">Buy Price (Rs.): </label>
          <input
            type="number"
            id="calculator__sell--buy-price"
            min="0"
            value={costPrice}
            onChange={e => {
              setCostPrice(Number(e.target.value));
              setTotalCostPrice(quantity * Number(e.target.value));
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="calculator__sell--price">Sell Price (Rs.): </label>
          <input
            type="number"
            id="calculator__sell--price"
            min="0"
            value={sellPrice}
            onChange={e => {
              setSellPrice(Number(e.target.value));
              setTotalSellingPrice(quantity * Number(e.target.value));
            }}
          />
        </div>
        <div className="form-group">
          <span className="label">Total Cost (Rs.): </span>
          <span className="result-field">{totalSellingPrice.toFixed(2)}</span>
        </div>
        <div className="form-group">
          <span className="label">Broker Commission (%): </span>
          <span className="result-field">{calculateBrokerCommissionPercentage(totalSellingPrice)} %</span>
        </div>
        <div className="form-group">
          <span className="label">Broker Commission (Rs.): </span>
          <span className="result-field">
            {((calculateBrokerCommissionPercentage(totalSellingPrice) * totalSellingPrice) / 100).toFixed(2)}
          </span>
        </div>
        <div className="form-group">
          <span className="label">Sebon Fee (%): </span>
          <span className="result-field">{0.015} %</span>
        </div>
        <div className="form-group">
          <span className="label">Sebon Fee (Rs.): </span>
          <span className="result-field">{((0.015 * totalSellingPrice) / 100).toFixed(2)}</span>
        </div>
        <div className="form-group">
          <span className="label">DP Change Charge (Rs.): </span>
          <span className="result-field">{25}</span>
        </div>
        <div className="form-group">
          <span className="label">Gain Tax (%): </span>
          <span className="result-field">{5} % of profit</span>
        </div>
        <div className="form-group">
          <span className="label">Gain Tax (Rs.): </span>
          <span className="result-field">{getGainTax()}</span>
        </div>
        <div className="form-group">
          <span className="label">Bought For (Rs.): </span>
          <span className="result-field jade">
            {totalCostPrice > 0
              ? (
                  totalCostPrice +
                  (calculateBrokerCommissionPercentage(totalCostPrice) * totalCostPrice) / 100 +
                  (0.015 * totalCostPrice) / 100 +
                  25
                ).toFixed(2)
              : 0}
          </span>
        </div>
        <div className="form-group">
          <span className="label">Selling For (Rs.): </span>
          <span className="result-field jade">
            {totalSellingPrice > 0
              ? (
                  totalSellingPrice -
                  (calculateBrokerCommissionPercentage(totalSellingPrice) * totalSellingPrice) / 100 -
                  (0.015 * totalSellingPrice) / 100 -
                  25 -
                  getGainTax()
                ).toFixed(2)
              : 0}
          </span>
        </div>
        <div className="form-group">
          <span className="label">Profit/Loss (Rs.): </span>
          <span className="result-field jade">{getProfit()[0]}</span>
        </div>
        <div className="form-group">
          <span className="label">Profit/Loss (%): </span>
          <span className="result-field jade">{getProfit()[1]} %</span>
        </div>
      </form>
    </div>
  );
};

export default SellCalculator;
