import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

export default function Card({ title, fetchUrl }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		try {
			async function fetchData() {
				const request = await axios.get(fetchUrl);
				setMovies(request.data.results);
				return request;
			}
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, [fetchUrl]);
	console.log(movies);

	return <div></div>;
}
