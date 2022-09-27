import RECEBE_TOKEN from '../../Constantes';

const INITIAL_STATE = { token: '' };

const reducerToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEBE_TOKEN:
    return { token: action.token };
  default:
    return state;
  }
};

export default reducerToken;
