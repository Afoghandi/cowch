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
    LOGOUT,
} from '../constants/types';
import setAuthToken from '../utils/setAuthToken';


export const loadToken = () => async(dispatch) => {
    if (localStorage.token) {
        return dispatch({
            type: TOKEN_LOADED,
            payload: localStorage.getItem('token'),
        });
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//load user
export const loadUser = () => async(dispatch) => {

    const token = localStorage.getItem('token');

    /**
     * 
     * try {
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
     */

 
  if (token) {
    setAuthToken(token); 
   
    
  } else {
    dispatch({ type: AUTH_ERROR });
    return;
  }
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth`);
        dispatch({type:USER_LOADED, payload:res.data})
    }catch(err){
        dispatch({type:AUTH_ERROR})
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
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, body, config);
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors || [];
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        localStorage.removeItem('token');
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
       
        
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, body, config);
       
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors || [];
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        localStorage.removeItem('token');
        dispatch({
            type: SIGNIN_FAIL,
        });
    }
};

// Logout / clear profile

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};