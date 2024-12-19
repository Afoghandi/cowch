import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile, deleteProfileAction } from '../actions/profile';
import { Header, Form } from '../components';
import * as ROUTES from '../constants/routes';
import { Profiles } from '../components';
import { FooterContainer } from './footer';

import logo from '../logo.png';
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';

const SelectProfileContainer = ({
	getCurrentProfile,
	user,
	profiles,
	loading,
	createProfile,
	history,
	error,
	setProfile,
	deleteProfileAction
}) => {

	useEffect(() => { 
		 
		getCurrentProfile();
	}, [getCurrentProfile]);

	const [formData, setFormData] = useState({ userName: '', profileName: '' });

	const { userName, profileName } = formData;

	const isInvalid = userName === '' || profileName === '';

	const handleChange = (e) => {
		const {name, value}= e.target;
		setFormData((prevState)=> ({...prevState,[name]: value}));
	};
	const handleRetry = ()=>{
		getCurrentProfile();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.userName || !formData.profileName) {
				console.error("Form data is incomplete");
				return;
		}
	
		createProfile(formData, history);

		// Clear the form fields
		setFormData({ userName: '', profileName: '' });
};


if(loading) return <LoadingSpinner/>
if(error) return <Error message={error} onRetry={handleRetry}/>

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
														
                            onClick={() => 
															
															{
															
																setProfile({ displayName: profile.profileName, photoUrl: profile.photoUrl })}}
																onDelete={() => deleteProfileAction(profile._id)} 
                        >
                            <Profiles.Picture src={profile.photoUrl || user.avatar} alt='profile picture' />
                            <Profiles.Name>{profile.profileName}</Profiles.Name>
												
                        </Profiles.User>
                    ))}
                  


				</Profiles.List>
			</Profiles>
			<Form>
				<Form.Title>Add a profile </Form.Title>

				<Form.Base onSubmit={handleSubmit}>
					<Form.Input
						placeholder='User Name'
						name='userName'
						value={formData.userName || ''}
						onChange={handleChange}
					/>

					<Form.Input
					placeholder='Display Name'
					name='profileName'
						value={formData.profileName}
						autoComplete='off'
						onChange={handleChange}
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
	loading:PropTypes.bool.isRequired,
	error:PropTypes.string,
	profile: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profiles: state.profile.profiles,
	loading: state.profile.loading,
	error: state.profile.error,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile, deleteProfileAction })(
	withRouter(SelectProfileContainer)
);
