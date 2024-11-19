import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.themoviedb.org/3',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token']=token
      //console.log("x-auth-token Header from axios:", token); 
    }
    return config;
  }, (error) => Promise.reject(error));


export default instance;