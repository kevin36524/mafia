import { all } from 'redux-saga/effects';
import { categoriesSaga } from './game/game.saga';
// import userSaga from './userSaga';
// import appSaga from './appSaga';

function* rootSaga() {
  yield all([
    // userSaga(),
    // appSaga()
    categoriesSaga()
  ]);
}

export default rootSaga;
