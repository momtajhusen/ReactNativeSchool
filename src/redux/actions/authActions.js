// src/redux/actions/authActions.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

// src/redux/actions/userActions.js

import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../types';

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});
