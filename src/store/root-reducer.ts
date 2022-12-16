import { combineReducers } from 'redux';
import { gameReducer } from './game/game.reducer';


const rootReducer = combineReducers({
  app: gameReducer
});

export default rootReducer;
