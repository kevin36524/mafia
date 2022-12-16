export enum GAME_ACTION_TYPES {
    JOIN_ROOM_START = "game/JOIN_ROOM_START",
    JOIN_ROOM_SUCCESS = "game/JOIN_ROOM_SUCCESS",
    JOIN_ROOM_FAILED = "game/JOIN_ROOM_FAILED",

    UPDATE_ROOM = "game/UPDATE_ROOM",
}

export enum AppScreens {
    joinRoom = "appScreen/joinRoom",
    gameRoom = "appScreen/gameRoom",
}

export enum ReturnStatus {
    done = "Done",
    error = "Error"
}

export type ReturnType = {
    status: ReturnStatus
}

export enum RoomUserRole {
    host = "host",
    participant = "participant"
}

export type RoomUser = {
    userID: string,
    userName: string,
    role: RoomUserRole
}

export type Room = {
    users: { [key: string]: RoomUser }
    id: string
}

export type rootStore = {
    currentUser: RoomUser,
}