import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';

//import { useHistory } from 'react-router-dom';

import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import AlertMessage from '../containers/alertMessage';
import { Form } from '../components';

//import * as ROUTES from '../constants/routes';

const Signup = ({ setAlert, signup, isAuthenticated }) => {
	//const history = useHistory();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = formData;

	const isInvalid =
		name === '' || password === '' || password2 === '' || email === '';

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('password do not match', 'danger');
		} else {
			signup({ name, email, password });
		}
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (isAuthenticated) {
		return <Redirect to='/browse' />;
	}
	return (
		<Fragment>
			<HeaderContainer>
				<Form>
					<Form.Title>Sign Up </Form.Title>
					<AlertMessage />

					<Form.Base onSubmit={(e) => onSubmit(e)}>
						<Form.Input
							placeholder='First Name'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
						/>
						<Form.Input
							placeholder='Email address'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
						/>

						<Form.Input
							type='password'
							value={password}
							name='password'
							autoComplete='off'
							placeholder='Password'
							onChange={(e) => onChange(e)}
						/>
						<Form.Input
							type='password'
							value={password2}
							name='password2'
							autoComplete='off'
							placeholder='Confirm Password'
							onChange={(e) => onChange(e)}
						/>

						<Form.Submit
							disabled={isInvalid}
							type='submit'
							data-testid='sign-in'
						>
							Sign Up
						</Form.Submit>
					</Form.Base>
					<Form.Text>
						{' '}
						Already a user?<Form.Link to='/signin'>
							{' '}
							Sign in now.
						</Form.Link>{' '}
					</Form.Text>
					<Form.TextSmall>
						{' '}
						This page is protect by Google reCAPTCHA to ensure you're not a bot.
						Learn more.
					</Form.TextSmall>
				</Form>
			</HeaderContainer>
			;
			<FooterContainer />
		</Fragment>
	);
};
Signup.propTypes = {
	setAlert: PropTypes.func.isRequired,
	signup: PropTypes.func.isRequired,

	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, signup })(Signup);
