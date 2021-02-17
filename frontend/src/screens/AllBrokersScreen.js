import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AllBrokersScreen = () => {
	const [allBrokers, setAllBrokers] = useState([]);
	const [filteredBrokers, setFilteredBrokers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getBrokers = async () => {
			const url = 'https://nepalstock-binaya.herokuapp.com/api/broker-info';
			const { data } = await axios.get(url);
			data.forEach(datum => {
				delete datum._id;
				delete datum.__v;
			});
			setAllBrokers(data);
			setFilteredBrokers(data);
			setLoading(false);
		};
		getBrokers();
		// eslint-disable-next-line
	}, []);

	const filterInputs = e => {
		const filtered = allBrokers.filter(element => element.brokerNumber.toString().includes(e.target.value) || element.brokerName.toUpperCase().includes(e.target.value.toUpperCase()));
		setFilteredBrokers(filtered);
	};

	return (
		<>
			{loading ? (
				<div className="loader"></div>
			) : (
				<section className="all-brokers">
					<div className="container">
						<h1>All Stock Brokers</h1>
						<div className="search-input-wrapper">
							<span>Search:</span>
							<input type="text" onChange={filterInputs} />
						</div>
						<div className="table-responsive">
							<table className="table broker-table">
								<thead>
									<tr>
										<th>Broker Number</th>
										<th>Name</th>
										<th>Address</th>
										<th>Phone Number</th>
										<th>Website</th>
									</tr>
								</thead>
								<tbody>
									{filteredBrokers.map((broker, brokerIndex) => {
										return broker.branches.map((branch, index) => (
											<tr className={brokerIndex % 2 === 0 ? 'even' : 'odd'}>
												{index === 0 ? <td rowSpan={broker.branches ? broker.branches.length : 1}>{broker.brokerNumber}</td> : ''}
												{index === 0 ? <td rowSpan={broker.branches ? broker.branches.length : 1}>{broker.brokerName}</td> : ''}
												<td>{branch.address}</td>
												<td>
													<div className="table-links-wrapper">
														{branch.phoneNumber.map(phoneNo => (
															<a href={`tel:${phoneNo.replace('-', '')}`}>{phoneNo}</a>
														))}
													</div>
												</td>
												{index === 0 ? (
													<td rowSpan={broker.branches ? broker.branches.length : 1}>
														<div className="table-links-wrapper">
															<a href={broker.website} target="_blank" rel="noreferrer">
																Visit Website
															</a>
														</div>
													</td>
												) : (
													''
												)}
											</tr>
										));
									})}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default AllBrokersScreen;
