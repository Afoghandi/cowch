import React, { useState, useEffect, Fragment } from 'react';
import axios from '../utils/axios';
import { Card, Player } from '../components';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { FooterContainer } from './footer';

//import requests from '../lib/requests';

export default function BrowseCard({ title, fetchUrl, isLargeCard }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	const base_url = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		try {
			async function fetchData() {
				const request = await axios.get(fetchUrl);
				const data = request.data.results;

				setMovies(data);

				return request;
			}
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, [fetchUrl]);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};
	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.name || movie?.title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<Fragment>
			<Card.Group>
				<Card.Title> {title}</Card.Title>
				{}

				<Card>
					<Card.Title> </Card.Title>

					<Card.Entities>
						{movies.map((movie) => (
							<Card.Item key={movie.id}>
								<Card.Image
									src={`${base_url}${
										isLargeCard ? movie.poster_path : movie.backdrop_path
									}`}
								/>
								<Card.Meta>
									<Card.SubTitle
										onClick={() => {
											handleClick(movie);
										}}
									></Card.SubTitle>
								</Card.Meta>
							</Card.Item>
						))}
					</Card.Entities>
					<Card.Feature>
						<Player>
							<Player.Button
								onClick={() => {
									handleClick('helo');
								}}
							/>
							{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
							{trailerUrl && (
								<YouTube.Player.Video videoId={trailerUrl} opts={opts} />
							)}
						</Player>
					</Card.Feature>
				</Card>
			</Card.Group>
		</Fragment>
	);
}
