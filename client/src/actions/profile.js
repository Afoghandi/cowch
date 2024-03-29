import axios from 'axios';

import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    PROFILE_SIGNUP_FAIL,
} from '../constants/types';

//Get currrent users profile

export const getCurrentProfile = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/profile/me2');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Create profile

export const createProfile = ({ formData, history, edit = false }) => async(
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post('/api/profile', formData, config);
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
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_SIGNUP_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};