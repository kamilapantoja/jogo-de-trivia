import { GET_CATEGORIES, SELECTED_CATEGORY,
  SELECTED_DIFFICULTY, SELECTED_TYPE } from '../../Constantes';

const INITIAL_STATE = {
  categories: [],
  selectedCategory: [],
  selectedDifficulty: '',
  selectedType: '',
};

const triviaData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
    };
  case SELECTED_CATEGORY:
    return {
      ...state,
      selectedCategory: action.payload,
    };
  case SELECTED_DIFFICULTY:
    return {
      ...state,
      selectedDifficulty: action.payload,
    };
  case SELECTED_TYPE:
    return {
      ...state,
      selectedType: action.payload,
    };
  default:
    return state;
  }
};

export default triviaData;
