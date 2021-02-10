import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DashboardScreen from './screens/DashboardScreen';
import CurrencyExchangeScreen from './screens/CurrencyExchangeScreen';
import AllStocksScreen from './screens/AllStocksScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className="main">
				<Switch>
					<Route path="/dashboard" component={DashboardScreen}></Route>
					<Route path="/exchange-rates" component={CurrencyExchangeScreen}></Route>
					<Route path="/all-stocks" component={AllStocksScreen}></Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;
