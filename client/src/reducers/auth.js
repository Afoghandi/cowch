/* eslint-disable import/no-anonymous-default-export */
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    TOKEN_LOADED,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
} from '../constants/types';

const initialState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TOKEN_LOADED:
            return {
                ...state,
                token: payload,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case SIGNUP_FAIL:
        case SIGNIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            sessionStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}