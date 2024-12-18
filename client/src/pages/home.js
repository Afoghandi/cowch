import React from 'react';
import { HeaderContainer } from '../containers/header';
import { Feature, OptForm } from '../components';

import * as ROUTES from '../constants/routes'
import { JumbotronContainer } from '../containers/jumbotron';
import { FaqsContainer } from '../containers/faqs';
import { FooterContainer } from '../containers/footer';

export default function Home() {
	return (
		<>
			{' '}
			<HeaderContainer>
				<Feature>
					<Feature.Title>
						Unlimited films, TV programmes and more.{' '}
					</Feature.Title>{' '}
					<Feature.SubTitle>
						Watch anywhere.Cancel at any time{' '}
					</Feature.SubTitle>{' '}
					<OptForm>
						<OptForm.Input placeholder='Email address' />
					
						<OptForm.Button to ={ROUTES.SIGN_UP} > Try it now </OptForm.Button> <OptForm.Break />
						<OptForm.Text>
							{' '}
							Ready to watch ? Sign Up  to start your lifetime membership{' '}
						</OptForm.Text>{' '}
					</OptForm>{' '}
				</Feature>{' '}
			</HeaderContainer>{' '}
			<JumbotronContainer />
			<FaqsContainer />
			<FooterContainer />
		</>
	);
}
