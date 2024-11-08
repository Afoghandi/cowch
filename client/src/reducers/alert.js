/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from '../constants/types';

const initialState = [];

export default function(alerts = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...alerts, payload];
        case REMOVE_ALERT:
            return alerts.filter((alert) => alert.id !== payload);
        default:
            return alerts;
    }
}