//const API_KEY = process.env.REACT_APP_API_KEY

// Dynamically set the backend base URL based on the environment
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5100';

const createRequest = (path)=>`${BASE_URL}/api/tmdb${path}?&language=en-US`;


const requests = {
    fetchTrending: createRequest('/trending/all/week'),
    fetchNetflixOriginals:createRequest(`/discover/tv`)+'&with_networks=213',
    fetchTopRated: createRequest(`/movie/top_rated`),
    fetchActionMovies: createRequest(`/discover/movie`)+'&with_genres=28',
    fetchComedyMovies: createRequest(`/discover/movie`)+'&with_genres=35',
    fetchHorrorMovies: createRequest(`/discover/movie`)+'&with_genres=27',
    fetchRomanceMovies: createRequest(`/discover/movie`)+'&with_genres=10749',
    fetchDocumentaries: createRequest(`/discover/movie`)+'&with_genres=99',
};

export default requests;