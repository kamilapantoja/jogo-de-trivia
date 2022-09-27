import { combineReducers } from 'redux';
import player from './player';
import { token, userReducer } from './token';
import triviaData from './triviaData';

const rootReducer = combineReducers({ token, userReducer, player, triviaData });

export default rootReducer;
