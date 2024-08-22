// AppContext.js

import React, { createContext, useReducer } from 'react';
import rootReducer from './AppReducer';
import initialState from './initialState';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

