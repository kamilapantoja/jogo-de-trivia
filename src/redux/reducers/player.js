import { SAVE_PLAYER, SAVE_ASSERTION, UPDATE_SCORE } from '../../Constantes';

const INITIAL_STATE = { player:
    {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state.player,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case SAVE_ASSERTION:
    return {
      ...state,
      assertions: action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
