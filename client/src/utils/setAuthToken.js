// utils/setAuthToken.js

import axios from 'axios';

const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token; // Set the token in x-auth-token header
       // console.log("x-auth-token Header set in Axios:", axios.defaults.headers.common['x-auth-token']); // Log to verify
      } else {
        delete axios.defaults.headers.common['x-auth-token']; // Remove token if not present
      }
    };
    

export default setAuthToken;
