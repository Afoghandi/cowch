import React, { Fragment } from 'react';

import SelectProfileContainer from './profile';

import requests from '../lib/requests';
import Card from './card';

export function BrowseContainer({ user }) {
	return (
		<Fragment>
			<Card
				title='Netflix Originals'
				fetchUrl={requests.fetchNetflixOriginals}
			/>
			<SelectProfileContainer />
		</Fragment>
	);
}
