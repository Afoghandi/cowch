import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import SelectProfileContainer from './profile';
import logo from '../logo.png';
import requests from '../lib/requests';
import BrowseCard from './card';
import axios from '../utils/axios';

function BrowseContainer({ auth: { user, loading }, logout }) {
	//state for banner image
	const [coverImage, setCoverImage] = useState([]);

	const [profile, setProfile] = useState({});

	// Get movie APIs

	useEffect(() => {
		try {
			async function fetchData() {
				const request = await axios.get(requests.fetchNetflixOriginals);

				setCoverImage(
					request.data.results[
						Math.floor(Math.random() * request.data.results.length - 1)
					]
				);
				return request;
			}
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, []);

	//function to truncate banner text
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}
	return profile.displayName ? (
		<Fragment>
			<Header
				img={`https://image.tmdb.org/t/p/original/${coverImage?.backdrop_path}`}
			>
				<Header.Frame>
					<Header.Group>
						<Header.Logo to={ROUTES.HOME} src={logo} alt='Cowch' />
					</Header.Group>
					<Header.Group>
						<Header.Profile>
							<Header.Search />
							<Header.Picture />
							<Header.Dropdown>
								<Header.Group>
									<Header.Picture src={user && user.avatar} alt='name' />
									<Header.TextLink>{user.name}</Header.TextLink>
								</Header.Group>
								<Header.Group>
									<Header.TextLink onClick={logout}>Log Out</Header.TextLink>
								</Header.Group>
							</Header.Dropdown>
						</Header.Profile>{' '}
					</Header.Group>
				</Header.Frame>
				<Header.Feature>
					<Header.FeatureCallOut>
						{coverImage?.title || coverImage?.name || coverImage?.original_name}
					</Header.FeatureCallOut>
					<Header.Text>{truncate(coverImage?.overview, 150)}</Header.Text>
					<Header.PlayButton> Play</Header.PlayButton>
				</Header.Feature>
			</Header>
			<BrowseCard
				title='coWch Originals'
				isLargeCard
				fetchUrl={requests.fetchNetflixOriginals}
			/>
			<BrowseCard title='Top Rated' fetchUrl={requests.fetchTopRated} />
			<BrowseCard title='Trending' fetchUrl={requests.fetchTrending} />
			<BrowseCard title='Romance' fetchUrl={requests.fetchRomanceMovies} />
			<BrowseCard title='Netflix Originals' fetchUrl={requests.fetchNetflixOriginals} />
			<BrowseCard title='Action' fetchUrl={requests.fetchActionMovies} />
			<BrowseCard title='Horror' fetchUrl={requests.fetchHorrorMovies} />
			<BrowseCard title= 'Documentaries' fetchUrl={requests.fetchDocumentaries}/>
	
		</Fragment>
	) : (
		<Fragment>
			<SelectProfileContainer user={user} setProfile={setProfile} />
		</Fragment>
	);
}
BrowseContainer.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(BrowseContainer);
