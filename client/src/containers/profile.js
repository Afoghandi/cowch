import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../actions/profile';
import { Header, Form } from '../components';
import * as ROUTES from '../constants/routes';
import { Profiles } from '../components';
import { FooterContainer } from './footer';

import logo from '../logo.png';
import { withRouter } from 'react-router-dom';

const SelectProfileContainer = ({
	getCurrentProfile,
	user,
	createProfile,
	history,
	setProfile,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	const [formData, setFormData] = useState({ userName: '', profileName: '' });

	const { userName, profileName } = formData;

	const isInvalid = userName === '' || profileName === '';

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<Header bg={false}>
				<Header.Frame>
					<Header.Logo to={ROUTES.HOME} src={logo} alt='Cowch' />
				</Header.Frame>
			</Header>
			<Profiles>
				<Profiles.Title>Who's watching?</Profiles.Title>
				<Profiles.List>
					<Profiles.User
						onClick={() => {
							setProfile({
								displayName: user.name,
								photoUrl: user.avatar,
							});
						}}
					>
						<Profiles.Picture src={user && user.avatar} alt='profile picture' />
						<Profiles.Name>{user && user.name} </Profiles.Name>
					</Profiles.User>
					<Profiles.User>
						<Profiles.Picture src={user && user.avatar} alt='profile picture' />
						<Profiles.Name>Add Profile </Profiles.Name>
					</Profiles.User>
				</Profiles.List>
			</Profiles>
			<Form>
				<Form.Title>Add a profile </Form.Title>

				<Form.Base onSubmit={(e) => onSubmit(e)}>
					<Form.Input
						placeholder='user name'
						name='userName'
						value={userName}
						onChange={(e) => onChange(e)}
					/>

					<Form.Input
						value={profileName}
						autoComplete='off'
						name='profileName'
						placeholder='Dispaly name'
						onChange={(e) => onChange(e)}
					/>

					<Form.Submit
						disabled={isInvalid}
						type='submit'
						data-testid='profile-name'
					>
						Add
					</Form.Submit>
				</Form.Base>
			</Form>
			<FooterContainer />
		</Fragment>
	);
};
SelectProfileContainer.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
	withRouter(SelectProfileContainer)
);
