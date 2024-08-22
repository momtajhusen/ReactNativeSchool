// src/redux/reducers/userReducer.js

import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../types';

const initialState = {
  userDetails: {},
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
