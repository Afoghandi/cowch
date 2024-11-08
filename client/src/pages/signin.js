import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signin } from '../actions/auth';

import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import { setAlert } from '../actions/alert';
import AlertMessage from '../containers/alertMessage';

function Signin({ signin, setAlert, auth: { isAuthenticated } }) {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const isInvalid = password === '' || email === '';

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try{
			await signin(email, password);
		}catch(err){
			setAlert('Invalid Credentials', 'danger')
		}
		
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
					<AlertMessage/>

					<Form.Base onSubmit={onSubmit}>
						<Form.Input
							placeholder='Email address'
							name='email'
							value={email}
							onChange={onChange}
						/>

						<Form.Input
							type='password'
							value={password}
							autoComplete='off'
							name='password'
							placeholder='Password'
							onChange={onChange}
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
	setAlert: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { signin , setAlert})(Signin);
