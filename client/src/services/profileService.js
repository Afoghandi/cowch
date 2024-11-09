// services/profileService.js
import api from '../utils/axios';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchCurrentProfile = () => api.get(`${BACKEND_BASE_URL}/api/profile/me`);
export const createProfile = (formData) => api.post(`${BACKEND_BASE_URL}/api/profile`, formData, {
  headers: { 'Content-Type': 'application/json' },
});