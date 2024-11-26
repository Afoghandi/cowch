//import axios from 'axios';

import { setAlert } from './alert';
import { fetchCurrentProfile, createProfile as createProfileService, deleteProfile } from '../services/profileService';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    DELETE_PROFILE,
    CREATE_PROFILE,
    PROFILE_SIGNUP_FAIL,
} from '../constants/types';

//Get currrent users profile

export const getCurrentProfile = () => async(dispatch) => {
   
    try {
        const res = await fetchCurrentProfile();
  

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
       
        if (err.response) {
            console.error("Response data:", err.response.data);
            console.error("Response status:", err.response.status);
          }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status },
        });
    }
};

//Create profile

export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    

    try {
        const res = await createProfileService(formData); // Pass formData directly
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/browse');
        }
    } catch (err) {
        const errors = err.response?.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_SIGNUP_FAIL,
            payload: { msg: err.response?.statusText, status: err.response?.status },
        });
    }
};


// Delete a profile
export const deleteProfileAction = (profileId) => async (dispatch) => {
   
    try {
        await deleteProfile(profileId);
        dispatch({
            type: DELETE_PROFILE,
            payload: profileId,
        });
        dispatch(setAlert('Profile deleted successfully', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status },
        });
        dispatch(setAlert('Failed to delete profile', 'danger'));
    }
};