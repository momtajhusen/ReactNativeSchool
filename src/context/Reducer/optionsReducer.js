const optionsReducer = (state, action) => {
 switch (action.type) {
    case 'SET_CLASS_SECTIONS':
      return {
        ...state,
        classSections: action.payload,
      };
    case 'SET_CLASS_SUBJECTS':
      return {
        ...state,
        classSubjects: action.payload,
      };
    default:
      return state;
  }
};

export default optionsReducer;
