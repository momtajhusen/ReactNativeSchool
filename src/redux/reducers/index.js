// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
});
