// Reducer/themeReducer.js

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        themeMode: action.payload,
      };
    case 'SET_THEME_SWITCH':
      return {
        ...state,
        themeSwitch: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;

  