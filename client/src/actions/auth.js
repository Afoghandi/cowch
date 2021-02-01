import axios from 'axios';
import { setAlert } from './alert';

import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    TOKEN_LOADED,
    AUTH_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
} from '../constants/types';
import setAuthToken from '../utils/setAuthToken';

export const loadToken = () => async(dispatch) => {
    if (sessionStorage.token) {
        return dispatch({
            type: TOKEN_LOADED,
            payload: sessionStorage.getItem('token'),
        });
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//load user
export const loadUser = () => async(dispatch, getStore) => {
    try {
        const header = setAuthToken(getStore().auth.token);
        const res = await axios.get('/api/auth', header);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//Register User

export const signup = ({ name, email, password }) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        sessionStorage.removeItem('token');
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
};

//SIGNIN User

export const signin = (email, password) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        sessionStorage.removeItem('token');
        dispatch({
            type: SIGNIN_FAIL,
        });
    }
};