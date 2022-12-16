import { AnyAction } from 'redux';

import { Room, RoomUser } from './game.types';

import {
  joinRoomStartActionCreator,
  joinRoomSuccessActionCreator,
  updateRoomActionCreator,
} from './game.action';

export type GameState = {
  readonly currentUser: RoomUser | null;
  readonly roomID: string | null;
  readonly room: Room | null;
};

const INITIAL_STATE: GameState = {
  currentUser: null,
  roomID: null,
  room: null
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (joinRoomSuccessActionCreator.match(action)) {
    return { ...state, currentUser: action.payload.user };
  }

  if (joinRoomStartActionCreator.match(action)) {
    return { ...state, roomID: action.payload.roomName}
  }

  if (updateRoomActionCreator.match(action)) {
    return { ...state, room: action.payload}
  }

  return state;
};
