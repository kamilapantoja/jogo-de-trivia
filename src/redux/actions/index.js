import { FETCH_TOKEN_URL, SAVE_ASSERTION,
  GET_CATEGORIES, SELECTED_CATEGORY,
  SELECTED_DIFFICULTY, SELECTED_TYPE, UPDATE_SCORE } from '../../Constantes';

const receiveToken = (result) => ({
  type: 'RECEIVE_TOKEN',
  token: result.token,
});

const userQuestions = (payload) => ({
  type: FETCH_TOKEN_URL,
  payload,
});

const getCategories = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const selectDifficulty = (payload) => ({
  type: SELECTED_DIFFICULTY,
  payload,
});

export const selectType = (payload) => ({
  type: SELECTED_TYPE,
  payload,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((token) => dispatch(receiveToken(token)));

export const savePlayer = ({ userName, email }) => ({
  type: 'SAVE_PLAYER',
  name: userName,
  gravatarEmail: email,
});

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERTION,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((data) => dispatch(userQuestions(data)));

export const fetchQuestionsFiltered = (token, category, difficulty, type) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`)
  .then((response) => response.json())
  .then((data) => dispatch(userQuestions(data)));

export const fetchCategories = () => (dispatch) => fetch('https://opentdb.com/api_category.php')
  .then((response) => response.json())
  .then((data) => dispatch(getCategories(data)));
