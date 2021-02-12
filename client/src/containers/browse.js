import React, { Fragment, useState, useEffect } from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import SelectProfileContainer from './profile';
import logo from '../logo.png';
import requests from '../lib/requests';
import BrowseCard from './card';
import axios from '../utils/axios';

export function BrowseContainer({ user }) {
	const [coverImage, setCoverImage] = useState([]);
	//const base_url = 'https://image.tmdb.org/t/p/original/';

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
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}
	return (
		<Fragment>
			<Header>
				<Header.Frame>
					<Header.Group>
						<Header.Logo to={ROUTES.HOME} src={logo} alt='Cowch' />
						<Header.TextLink>Series</Header.TextLink>
						<Header.TextLink>Films</Header.TextLink>
					</Header.Group>
					<Header.Group>
						<Header.Profile>
							<Header.Search />
							<Header.Picture />
							<Header.Dropdown>
								<Header.Group>
									<Header.Picture />
									<Header.TextLink>Hello</Header.TextLink>
								</Header.Group>
								<Header.Group>
									<Header.TextLink>Sign Out</Header.TextLink>
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
				isLargeCard
				title='coWch Originals'
				fetchUrl={requests.fetchNetflixOriginals}
			/>
			<BrowseCard title='Romance' fetchUrl={requests.fetchRomanceMovies} />
			<BrowseCard title='Top Rated' fetchUrl={requests.fetchTopRated} />
			<BrowseCard title='Trending' fetchUrl={requests.fetchTrending} />
			<SelectProfileContainer />
		</Fragment>
	);
}
