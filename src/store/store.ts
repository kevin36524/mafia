import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import logger from 'redux-logger';
import { applyMiddleware, Middleware } from 'redux';

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

applyMiddleware(sagaMiddleware)

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
  ].filter((middleware): middleware is Middleware => Boolean(middleware));

const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

export default store;
