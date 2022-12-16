import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer.utils";
import { GAME_ACTION_TYPES, RoomUser, Room } from "./game.types";


export type JoinRoomStartActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_START, {roomName: string, userName: string}>
export type JoinRoomSuccessActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, {user: RoomUser}>;
export type JoinRoomFailedActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, Error>;
export type UpdateRoomActionType = ActionWithPayload<GAME_ACTION_TYPES.UPDATE_ROOM, {room: Room}>;

export const joinRoomStartActionCreator = withMatcher(
    (roomName: string, userName: string): JoinRoomStartActionType => 
        createAction(GAME_ACTION_TYPES.JOIN_ROOM_START, {roomName, userName})
);

export const joinRoomSuccessActionCreator = withMatcher(
    (user:RoomUser) => createAction(GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, {user})
)

export const joinRoomFailedActionCreator = withMatcher(
    (error: Error) => createAction(GAME_ACTION_TYPES.JOIN_ROOM_FAILED, error)
)

export const updateRoomActionCreator = withMatcher(
    (room:Room) => createAction(GAME_ACTION_TYPES.UPDATE_ROOM, room)
)