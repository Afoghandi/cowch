// services/profileService.js
import api from '../utils/axios';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchCurrentProfile = () => api.get(`${BACKEND_BASE_URL}/api/profile/me`);
export const createProfile = (formData) => {
 
  return api.post(`${BACKEND_BASE_URL}/api/profile`, JSON.stringify(formData), {
      headers: {
          'Content-Type': 'application/json',
      },
  });
};

export const deleteProfile =(profileId)=> 

 api.delete(`${BACKEND_BASE_URL}/api/profile/${profileId}`);