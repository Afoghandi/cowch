import React, { useState, useEffect, Fragment } from 'react';
import axios from '../utils/axios';
import { Row } from '../components';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

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
			<Row>
				<h2>{title} </h2>
				<Row.RowPosters>
					{movies.map((movie) => (
						<Row.Image
							key={movie.id}
							onClick={() => handleClick(movie)}
							src={`${base_url}${
								isLargeCard ? movie.backdrop_path : movie.poster_path
							}`}
							alt={movie.name}
						/>
					))}
				</Row.RowPosters>
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</Row>
		</Fragment>
	);
}
