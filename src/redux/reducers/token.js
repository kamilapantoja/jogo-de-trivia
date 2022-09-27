import { FETCH_TOKEN_URL } from '../../Constantes';

const INITIAL_STATE = {};

export const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_TOKEN':
    return action.token;
  default:
    return state;
  }
};

const INITIAL_STATE_2 = {
  data: [],
};

export const userReducer = (state = INITIAL_STATE_2, action) => {
  switch (action.type) {
  case FETCH_TOKEN_URL:
    return {
      data: action.payload,
    };
  default: return state;
  }
};
