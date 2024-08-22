// combineReducers.js

const combineReducers = (reducers) => (state = {}, action) =>
  Object.keys(reducers).reduce(
    (acc, key) => ({
      ...acc,
      [key]: reducers[key](state[key], action),
    }),
    {}
  );

export default combineReducers;
