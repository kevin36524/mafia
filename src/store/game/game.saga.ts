import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { makeJoinRoomAPICall } from '../../utils/apis.utils';


import {
  joinRoomSuccessActionCreator,
  joinRoomFailedActionCreator,
  JoinRoomStartActionType,
} from './game.action';

import { GAME_ACTION_TYPES, RoomUser } from './game.types';

export function* joinRoomAsync({
    payload:{userName, roomName}
}: JoinRoomStartActionType) {
    console.log("I am here")
  try {
    const newUser = yield* call(makeJoinRoomAPICall, userName, roomName);
    yield* put(joinRoomSuccessActionCreator(newUser));
  } catch (error) {
    yield* put(joinRoomFailedActionCreator(error as Error));
  }
}

export function* onJoinRoomStart() {
  yield* takeLatest(
    GAME_ACTION_TYPES.JOIN_ROOM_START,
    joinRoomAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onJoinRoomStart)]);
}
