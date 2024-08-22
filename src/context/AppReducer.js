// AppReducer.js
import combineReducers from './combineReducers';
import themeReducer from './Reducer/themeReducer';
import optionsReducer from './Reducer/optionsReducer';
import schoolDetailsReducer from './Reducer/schoolDetailsReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  options: optionsReducer,
  school:  schoolDetailsReducer,
});

export default rootReducer;
