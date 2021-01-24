import React from 'react';
import { Header } from '../components';

import * as ROUTES from '../constants/routes';
import logo from '../logo.png';

export function HeaderContainer({ children }) {
	return (
		<Header>
			<Header.Frame>
				<Header.Logo to={ROUTES.HOME} alt='Cowch' src={logo} />{' '}
				<Header.ButtonLink> Sign In </Header.ButtonLink>{' '}
			</Header.Frame>{' '}
			{children}{' '}
		</Header>
	);
}
