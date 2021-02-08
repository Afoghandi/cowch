/* eslint-disable import/no-anonymous-default-export */

import {
    GET_PROFILE,
    PROFILE_ERROR,
    PROFILE_SIGNUP_FAIL,
    CREATE_PROFILE,
} from '../constants/types';

const initialState = {
    profile: {},
    profiles: {},
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case PROFILE_ERROR:
        case PROFILE_SIGNUP_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}