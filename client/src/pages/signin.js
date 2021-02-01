import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signin } from '../actions/auth';

import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';

function Signin({ signin, isAuthenticated }) {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const isInvalid = password === '' || email === '';

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		signin(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/browse' />;
	}
	return (
		<Fragment>
			<HeaderContainer>
				{' '}
				<Form>
					<Form.Title>Sign In </Form.Title>

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
		</Fragment>
	);
}

Signin.propTypes = {
	signin: PropTypes.func.isRequired,

	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signin })(Signin);
