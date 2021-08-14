import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import BuyCalculator from '../components/BuyCalculator';
import SellCalculator from '../components/SellCalculator';
import BonusPriceAdjustmentCalculator from '../components/BonusPriceAdjustmentCalculator';
import RightPriceAdjustmentCalculator from '../components/RightPriceAdjustmentCalculator';

const CalculatorScreen = () => {
	return (
		<section className="calculator-section">
			<div className="container">
				<h1>Calcultors</h1>
				<Tabs>
					<TabList>
						<Tab>Buying</Tab>
						<Tab>Selling</Tab>
						<Tab>Bonus Adjustment</Tab>
						<Tab>Right Share Adjustment</Tab>
					</TabList>
					<TabPanel>
						<BuyCalculator />
					</TabPanel>
					<TabPanel>
						<SellCalculator />
					</TabPanel>
					<TabPanel>
						<BonusPriceAdjustmentCalculator />
					</TabPanel>
					<TabPanel>
						<RightPriceAdjustmentCalculator />
					</TabPanel>
				</Tabs>
			</div>
		</section>
	);
};

export default CalculatorScreen;
