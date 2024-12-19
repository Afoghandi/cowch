/* eslint-disable import/no-anonymous-default-export */

import {
    GET_PROFILE,
    PROFILE_ERROR,
    PROFILE_SIGNUP_FAIL,
    CREATE_PROFILE,
    DELETE_PROFILE,
    PROFILE_LOADING
} from '../constants/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: false,
    error: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_LOADING:
            return{
                ...state, loading:true, error:null
            };
        case GET_PROFILE:
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        case CREATE_PROFILE:
            return {
                ...state,
                profiles:[...state.profiles, payload],
                loading: false,
            };
            case DELETE_PROFILE:
                return{
                    ...state,
                    profiles:state.profiles.filter((profile)=> profile._id !== payload),
                    loading:false,
                }
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