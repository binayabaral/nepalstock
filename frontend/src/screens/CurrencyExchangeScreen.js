import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyChart from '../components/CurrencyChart';

const CurrencyExchangeScreen = () => {
	const [allExchangeRates, setAllExchangeRates] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [chartLabel, setChartLabel] = useState([]);

	const [primaryCurrency, setPrimaryCurrency] = useState('USD');
	const [secondaryCurrency, setSecondaryCurrency] = useState('NPR');

	const [primaryCurrencyValue, setPrimaryCurrencyValue] = useState(0);
	const [secondaryCurrencyValue, setSecondaryCurrencyValue] = useState(0);

	const [conversionFactor, setConversionFactor] = useState(1);

	const unwantedElements = ['_id', 'date', '__v', 'createdAt', 'updatedAt'];

	const data = {
		labels: chartLabel,
		datasets: [
			{
				label: 'Value',
				data: chartData,
				fill: true,
				borderColor: '#01bf71',
				pointRadius: '0',
				lineTension: '0',
			},
		],
	};

	const getchartData = allData => {
		const requiredData = [];
		const requiredLabel = [];
		for (var i = 0; i < allData.length; i++) {
			if (primaryCurrency === 'NPR' && secondaryCurrency === 'NPR') {
				requiredData.push(1);
			} else if (primaryCurrency === 'NPR') {
				requiredData.push((1 / (allData[i][secondaryCurrency][0].buy / allData[i][secondaryCurrency][0].unit)).toFixed(5));
			} else if (secondaryCurrency === 'NPR') {
				requiredData.push((allData[i][primaryCurrency][0].buy / allData[i][primaryCurrency][0].unit).toFixed(5));
			} else {
				requiredData.push(((allData[i][primaryCurrency][0].buy / allData[i][primaryCurrency][0].unit / allData[i][secondaryCurrency][0].buy) * allData[i][secondaryCurrency][0].unit).toFixed(5));
			}
			requiredLabel.push(allData[i].date.slice(0, 10));
		}
		setConversionFactor(requiredData[0]);
		setPrimaryCurrencyValue(1);
		setSecondaryCurrencyValue(requiredData[0]);
		setChartData(requiredData.reverse());
		setChartLabel(requiredLabel.reverse());
	};

	useEffect(() => {
		const getRates = async () => {
			const url = 'https://nepalstock-binaya.herokuapp.com/api/exchange-rate/historic';
			const { data } = await axios.get(url);
			setAllExchangeRates(data);
		};
		getRates();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getchartData(allExchangeRates);
		// eslint-disable-next-line
	}, [allExchangeRates, primaryCurrency, secondaryCurrency]);

	const handlePrimaryCurrencyChange = e => {
		setPrimaryCurrency(e.target.value);
	};

	const handleSecondaryCurrencyChange = e => {
		setSecondaryCurrency(e.target.value);
	};

	const handlePrimaryCurrencyValueChange = e => {
		setPrimaryCurrencyValue(e.target.value);
		setSecondaryCurrencyValue(e.target.value * conversionFactor);
	};

	const handleSecondaryCurrencyValueChange = e => {
		setSecondaryCurrencyValue(e.target.value);
		setPrimaryCurrencyValue(e.target.value / conversionFactor);
	};

	return (
		<>
			<section className="exchange-chart">
				<div className="container">
					<h1>Currency Rates</h1>
					<CurrencyChart data={data} startDate={data.labels[0]} endDate={data.labels[data.labels.length - 1]} primaryCurrency={primaryCurrency} secondaryCurrency={secondaryCurrency} />
				</div>
			</section>
			<section className="currency-conversion">
				<div className="container">
					<h3>Conversion</h3>
					<div className="conversion-box">
						<div className="currency-block">
							<input type="number" value={primaryCurrencyValue} onChange={handlePrimaryCurrencyValueChange} />
							<select name="primary-currency" id="primary-currency" onChange={handlePrimaryCurrencyChange}>
								{allExchangeRates.length > 0
									? Object.keys(allExchangeRates[0])
											.filter(element => !unwantedElements.includes(element))
											.map(key => (
												<option value={key} selected={key === 'USD'}>
													{allExchangeRates[0][key][0].name}
												</option>
											))
									: ''}
								<option value="NPR">Nepalsese Rupee</option>
							</select>
						</div>
						<span className="conversion-box-txt">Equals:</span>
						<div className="currency-block">
							<input type="number" value={secondaryCurrencyValue} onChange={handleSecondaryCurrencyValueChange} />
							<select name="primary-currency" id="primary-currency" onChange={handleSecondaryCurrencyChange}>
								{allExchangeRates.length > 0
									? Object.keys(allExchangeRates[0])
											.filter(element => !unwantedElements.includes(element))
											.map(key => <option value={key}>{allExchangeRates[0][key][0].name}</option>)
									: ''}
								<option value="NPR" selected>
									Nepalsese Rupee
								</option>
							</select>
						</div>
					</div>
				</div>
			</section>
			<section className="todays-currency-rates">
				<div className="container">
					<h4>All Currency Rates for Today</h4>
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th>Currency Name</th>
									<th>ISO3</th>
									<th>Unit</th>
									<th>Buying Rate</th>
									<th>Sellling Rate</th>
								</tr>
							</thead>
							<tbody>
								{allExchangeRates.length > 0
									? Object.keys(allExchangeRates[0])
											.filter(element => !unwantedElements.includes(element))
											.map(currency => (
												<tr>
													<td>{allExchangeRates[0][currency][0].name}</td>
													<td>{currency}</td>
													<td>{allExchangeRates[0][currency][0].unit}</td>
													<td>{allExchangeRates[0][currency][0].buy}</td>
													<td>{allExchangeRates[0][currency][0].sell}</td>
												</tr>
											))
									: ''}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</>
	);
};

export default CurrencyExchangeScreen;
