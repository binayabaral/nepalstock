import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DashboardScreen from './screens/DashboardScreen';
import CurrencyExchangeScreen from './screens/CurrencyExchangeScreen';
import AllStocksScreen from './screens/AllStocksScreen';
import AllBrokersScreen from './screens/AllBrokersScreen';
import SecurityDetailPage from './screens/SecurityDetailPage';

function App() {
	return (
		<Router>
			<Header />
			<main className="main">
				<Switch>
					<Route path="/dashboard" component={DashboardScreen}></Route>
					<Route path="/exchange-rates" component={CurrencyExchangeScreen}></Route>
					<Route path="/all-brokers" component={AllBrokersScreen}></Route>
					<Route path="/all-stocks" exact component={AllStocksScreen}></Route>
					<Route path="/all-stocks/company/:symbol" component={SecurityDetailPage}></Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;
