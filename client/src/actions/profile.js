//import axios from 'axios';

import { setAlert } from './alert';
import { fetchCurrentProfile, createProfile as createProfileService} from '../services/profileService';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    PROFILE_SIGNUP_FAIL,
} from '../constants/types';

//Get currrent users profile

export const getCurrentProfile = () => async(dispatch) => {
    //console.log("getCurrentProfile action called"); 
    try {
        const res = await fetchCurrentProfile();
       // console.log("Profiles fetched from API:", res.data); 

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
       // console.error("Error fetching profiles:", err);
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

export const createProfile = ({ formData, history, edit = false }) => async(
    dispatch
) => {
  

    try {
        const res= await createProfileService(formData)
        //console.log("Profiles fetched from API:", res.data); 
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });
        dispatch(
            setAlert(edit ? 'Profile Updated' : ' Profile Created', 'success')
        );
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