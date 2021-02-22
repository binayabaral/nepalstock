import React from 'react';

const SecurityDetailScreen = ({ match }) => {
	return (
		<div>
			<h1>This is the details page for {match.params.symbol}</h1>
		</div>
	);
};

export default SecurityDetailScreen;
