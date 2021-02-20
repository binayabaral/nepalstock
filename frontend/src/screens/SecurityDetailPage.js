import React from 'react';

const SecurityDetailPage = ({ match }) => {
	return (
		<div>
			<h1>This is the details page for {match.params.symbol}</h1>
		</div>
	);
};

export default SecurityDetailPage;
