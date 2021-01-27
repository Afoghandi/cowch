import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signin() {
	//const history = useHistory();
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const [error, setError] = useState('');

	const isInvalid = password === '' || email === '';

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('SUCCESS');
	};

	return (
		<>
			<HeaderContainer>
				{' '}
				<Form>
					<Form.Title>Sign In </Form.Title>
					{error && <Form.Error>Error</Form.Error>}
					<Form.Base onSubmit={(e) => onSubmit(e)}>
						<Form.Input
							placeholder='Email address'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
						/>

						<Form.Input
							type='password'
							value={password}
							autoComplete='off'
							name='password'
							placeholder='Password'
							onChange={(e) => onChange(e)}
						/>

						<Form.Submit
							disabled={isInvalid}
							type='submit'
							data-testid='sign-in'
						>
							Sign In
						</Form.Submit>
					</Form.Base>
					<Form.Text>
						{' '}
						New to Netflix?<Form.Link to='/signup'>
							{' '}
							Sign up now.
						</Form.Link>{' '}
					</Form.Text>
					<Form.TextSmall>
						{' '}
						This page is protect by Google reCAPTCHA to ensure you're not a bot
					</Form.TextSmall>
				</Form>
			</HeaderContainer>
			;
			<FooterContainer />
		</>
	);
}
