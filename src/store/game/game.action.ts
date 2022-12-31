import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer.utils";
import { GAME_ACTION_TYPES, RoomUser, Room } from "./game.types";


export type JoinRoomStartActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_START, {roomName: string, userName: string}>;
export type JoinRoomSuccessActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, {user: RoomUser}>;
export type JoinRoomFailedActionType = ActionWithPayload<GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, Error>;
export type UpdateRoomActionType = ActionWithPayload<GAME_ACTION_TYPES.UPDATE_ROOM, {room: Room}>;
export type startGameActionType = ActionWithPayload<GAME_ACTION_TYPES.START_GAME, {room: Room, numberOfMafia: number}>;
export type wakeUpMafiaActionType = ActionWithPayload<GAME_ACTION_TYPES.WAKEUP_MAFIA, {room: Room}>;
export type mafiaCastKillVoteActionType = ActionWithPayload<GAME_ACTION_TYPES.MAFIA_KILL_VOTE, {room: Room, mafiaUserID: string, victimUserID: string}>;
export type mafiaFinalizeVoteActionType = ActionWithPayload<GAME_ACTION_TYPES.MAFIA_FINALIZE, {room: Room}>;
export type wakeUpDoctorActionType = ActionWithPayload<GAME_ACTION_TYPES.WAKEUP_DOCTOR, {room:Room} >;
export type doctorSaveActionType = ActionWithPayload<GAME_ACTION_TYPES.DOCTOR_SAVE, {room: Room, userToSave: string}>;
export type wakeUpPoliceActionType = ActionWithPayload<GAME_ACTION_TYPES.WAKEUP_POLICE, {room: Room} >;
export type policeDoneActionType = ActionWithPayload<GAME_ACTION_TYPES.POLICE_DONE, {room: Room} >;
export type showMafiaResultActionType = ActionWithPayload<GAME_ACTION_TYPES.SHOW_MAFIA_RESULT, {room: Room} >;
export type endGameActionType = ActionWithPayload<GAME_ACTION_TYPES.ENDGAME, {room:Room}>;
export type openVillageVoteActionType = ActionWithPayload<GAME_ACTION_TYPES.OPEN_VILLAGE_VOTE, {room: Room}>;
export type villagerCastKillVoteActionType = ActionWithPayload<GAME_ACTION_TYPES.VILLAGER_KILL_VOTE, {room: Room, killerUserID: string, victimUserID: string}>;
export type freezeVillageVoteActionType = ActionWithPayload<GAME_ACTION_TYPES.FREEZE_VILLAGE_VOTE, {room: Room}>;
export type putVillageToSleepActionType = ActionWithPayload<GAME_ACTION_TYPES.PUT_VILLAGE_TO_SLEEP, {room: Room}>; 
export type deleteUserActionType = ActionWithPayload<GAME_ACTION_TYPES.DELETE_USER, {room: Room, userID: string}>;


export const joinRoomStartActionCreator = withMatcher((roomName: string, userName: string): JoinRoomStartActionType => createAction(GAME_ACTION_TYPES.JOIN_ROOM_START, {roomName, userName}));
export const joinRoomSuccessActionCreator = withMatcher((user:RoomUser) => createAction(GAME_ACTION_TYPES.JOIN_ROOM_SUCCESS, {user}))
export const joinRoomFailedActionCreator = withMatcher((error: Error) => createAction(GAME_ACTION_TYPES.JOIN_ROOM_FAILED, error))
export const updateRoomActionCreator = withMatcher((room:Room) => createAction(GAME_ACTION_TYPES.UPDATE_ROOM, room))
export const startGameActionCreator = withMatcher((room: Room, numberOfMafia: number): startGameActionType => createAction(GAME_ACTION_TYPES.START_GAME, {room, numberOfMafia}))
export const wakeUpMafiaActionCreator = withMatcher((room: Room): wakeUpMafiaActionType => createAction(GAME_ACTION_TYPES.WAKEUP_MAFIA, {room}))
export const mafiaCastKillVoteActionCreator = withMatcher((room: Room, mafiaUserID: string, victimUserID: string): mafiaCastKillVoteActionType => createAction(GAME_ACTION_TYPES.MAFIA_KILL_VOTE, {room, mafiaUserID, victimUserID}))
export const mafiaFinalizeVoteActionCreator = withMatcher((room: Room): mafiaFinalizeVoteActionType => createAction(GAME_ACTION_TYPES.MAFIA_FINALIZE, {room}))
export const wakeUpDoctorActionCreator = withMatcher((room: Room): wakeUpDoctorActionType => createAction(GAME_ACTION_TYPES.WAKEUP_DOCTOR, {room}))
export const doctorSaveActionCreator = withMatcher((room: Room, userToSave: string): doctorSaveActionType => createAction(GAME_ACTION_TYPES.DOCTOR_SAVE, {room, userToSave}))
export const wakeUpPoliceActionCreator = withMatcher((room: Room): wakeUpPoliceActionType => createAction(GAME_ACTION_TYPES.WAKEUP_POLICE, {room}))
export const policeDoneActionCreator = withMatcher((room: Room): policeDoneActionType => createAction(GAME_ACTION_TYPES.POLICE_DONE, {room}))
export const showMafiaResultActionCreator = withMatcher((room: Room): showMafiaResultActionType => createAction(GAME_ACTION_TYPES.SHOW_MAFIA_RESULT, {room}))
export const endGameActionCreator = withMatcher((room: Room): endGameActionType => createAction(GAME_ACTION_TYPES.ENDGAME, {room}))
export const openVillageVoteActionCreator = withMatcher((room: Room): openVillageVoteActionType => createAction(GAME_ACTION_TYPES.OPEN_VILLAGE_VOTE, {room}))
export const villagerCastKillVoteActionCreator = withMatcher((room: Room, killerUserID: string, victimUserID: string): villagerCastKillVoteActionType => createAction(GAME_ACTION_TYPES.VILLAGER_KILL_VOTE, {room, killerUserID, victimUserID}))
export const freezeVillageVoteActionCreator = withMatcher((room: Room): freezeVillageVoteActionType => createAction(GAME_ACTION_TYPES.FREEZE_VILLAGE_VOTE, {room}))
export const putVillageToSleepActionCreator = withMatcher((room: Room): putVillageToSleepActionType => createAction(GAME_ACTION_TYPES.PUT_VILLAGE_TO_SLEEP, {room}))
export const deleteUserActionCreator = withMatcher((room:Room, userID:string) => createAction(GAME_ACTION_TYPES.DELETE_USER, {room, userID}))
