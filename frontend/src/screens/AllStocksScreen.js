import axios from 'axios';
import React, { useState, useEffect } from 'react';

import DataTable, { createTheme } from 'react-data-table-component';

const AllStocksScreen = ({ history }) => {
	const [allStocksPrices, setAllStockPrices] = useState([]);
	const [filteredStocksPrices, setFilteredStockPrices] = useState([]);
	const [loading, setLoading] = useState(true);

	const dataTableColumns = [
		{ name: 'Symbol', selector: 'symbol', sortable: true },
		{ name: 'Name', selector: 'securityName', sortable: true, grow: 4 },
		{ name: 'Last Transaction Price', selector: 'lastUpdatedPrice', sortable: true },
		{ name: 'Previous Closing Value', selector: 'previousDayClosePrice', sortable: true },
		{ name: 'Open Price', selector: 'openPrice', sortable: true },
		{ name: 'High Price', selector: 'highPrice', sortable: true },
		{ name: 'Low Price', selector: 'lowPrice', sortable: true },
		{ name: '1 yr High', selector: 'fiftyTwoWeekHigh', sortable: true },
		{ name: '1 yr Low', selector: 'fiftyTwoWeekLow', sortable: true },
	];

	createTheme('solarized', {
		text: {
			primary: '#000000',
			secondary: '#000000',
		},
		background: {
			default: '#eff7f7',
		},
		divider: {
			default: 'transparent',
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)',
		},
	});

	const customStyles = {
		rows: {
			style: {
				fontSize: 'inherit',
			},
		},
		headCells: {
			style: {
				fontSize: 'inherit',
				background: '#dff7eb',
				color: '#01bf71',
				minHeight: '80px',
			},
		},
	};

	const conditionalRowStyles = [
		{
			when: row => row.lastUpdatedPrice < row.previousDayClosePrice,
			style: {
				backgroundColor: '#ffcccb',
				'&:hover': {
					cursor: 'pointer',
					backgroundColor: '#fe9f9d',
				},
			},
		},
		{
			when: row => row.lastUpdatedPrice > row.previousDayClosePrice,
			style: {
				backgroundColor: '#70dbaf',
				'&:hover': {
					cursor: 'pointer',
					backgroundColor: '#33cc8d',
				},
			},
		},
		{
			when: row => row.lastUpdatedPrice === row.previousDayClosePrice,
			style: {
				backgroundColor: '#eff7f7',
				'&:hover': {
					cursor: 'pointer',
					backgroundColor: '#bedede',
				},
			},
		},
	];

	useEffect(() => {
		const getRates = async () => {
			const url = 'https://newweb.nepalstock.com/api/nots/nepse-data/today-price?size=300';
			const {
				data: { content: data },
			} = await axios.get(url);
			setAllStockPrices(data);
			setFilteredStockPrices(data);
			setLoading(false);
		};
		getRates();
		// eslint-disable-next-line
	}, []);

	const filterInputs = e => {
		const filtered = allStocksPrices.filter(element => element.symbol.toUpperCase().includes(e.target.value.toUpperCase()) || element.securityName.toUpperCase().includes(e.target.value.toUpperCase()));
		setFilteredStockPrices(filtered);
	};

	return (
		<>
			{loading ? (
				<div className="loader"></div>
			) : (
				<section className="all-stock-prices">
					<div className="container">
						<h1>Current Stock Prices</h1>
						<div className="search-input-wrapper">
							<span>Search:</span>
							<input type="text" onChange={filterInputs} />
						</div>
						<DataTable columns={dataTableColumns} data={filteredStocksPrices} striped="true" pagination="true" paginationPerPage={10} paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 300]} theme="solarized" customStyles={customStyles} conditionalRowStyles={conditionalRowStyles} onRowClicked={row => history.push(`/all-stocks/company/${row.symbol}`)} />
					</div>
				</section>
			)}
		</>
	);
};

export default AllStocksScreen;
