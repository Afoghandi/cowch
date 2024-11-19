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
import LoadingSpinner from '../components/loading';

const SelectProfileContainer = ({
	getCurrentProfile,
	user,
	profiles,
	//profile:{profile,  loading},
	createProfile,
	history,
	setProfile,
}) => {
	//const token = localStorage.getItem('token');
	//console.log("Token in localStorage:", token);
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
//if(loading) return <LoadingSpinner/>
//console.log("Profiles from Redux in SelectProfileContainer:", profiles);
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
				{profiles.map((profile) => (
			
                        <Profiles.User
                            key={profile._id}
														
                            onClick={() => setProfile({ displayName: profile.user.name, photoUrl: profile.photoUrl })}
                        >
                            <Profiles.Picture src={profile.photoUrl || user.avatar} alt='profile picture' />
                            <Profiles.Name>{profile.profileName}</Profiles.Name>
                        </Profiles.User>
                    ))}
                    <Profiles.User>
                        <Profiles.Picture src={user && user.avatar} alt='profile picture' />
                        <Profiles.Name>Add Profile</Profiles.Name>
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
	profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
	withRouter(SelectProfileContainer)
);
