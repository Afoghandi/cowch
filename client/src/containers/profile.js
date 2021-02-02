import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import { Profiles } from '../components';

import logo from '../logo.png';

export function SelectProfileContainer() {
	return (
		<>
			<Header bg={false}>
				<Header.Frame>
					<Header.Logo to={ROUTES.HOME} src={logo} alt='Netflix' />
				</Header.Frame>
			</Header>
			<Profiles>
				<Profiles.Title>Who's watching?</Profiles.Title>
				<Profiles.List>
					<Profiles.User>
						<Profiles.Picture src='/images/users/4.png' alt='profile picture' />
						<Profiles.Name>afo </Profiles.Name>
					</Profiles.User>
				</Profiles.List>
			</Profiles>
		</>
	);
}
