import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { makeJoinRoomAPICall, updateRoomAPICall } from '../../utils/apis.utils';
import { doctorSave, 
  endGame, 
  mafiaFinalizeVote,
  mafiaKillVote, 
  openVillageVoting, 
  putPoliceToSleep, 
  showMafiaResult, 
  startGame, 
  wakeUpDoctor, 
  wakeUpMafia, 
  wakeUpPolice,
  villagerKillVote,
  freezeVillageVote,
  putVillageToSleep,
  removeUser,
 } from '../../utils/game.utils';


import {
  joinRoomSuccessActionCreator,
  joinRoomFailedActionCreator,
  JoinRoomStartActionType,
  startGameActionType,
  wakeUpMafiaActionType,
  mafiaCastKillVoteActionType,
  mafiaFinalizeVoteActionType,
  wakeUpDoctorActionType,
  doctorSaveActionType,
  wakeUpPoliceActionType,
  policeDoneActionType,
  showMafiaResultActionType,
  endGameActionType,
  openVillageVoteActionType,
  villagerCastKillVoteActionType,
  freezeVillageVoteActionType,
  putVillageToSleepActionType,
  deleteUserActionType,
} from './game.action';

import { GAME_ACTION_TYPES } from './game.types';

export function* joinRoomAsync({
    payload:{userName, roomName}
}: JoinRoomStartActionType) {
  try {
    console.log("I am in joinRoomAsync")
    const newUser = yield* call(makeJoinRoomAPICall, userName, roomName);
    yield* put(joinRoomSuccessActionCreator(newUser));
  } catch (error) {
    yield* put(joinRoomFailedActionCreator(error as Error));
  }
}

export function* startRoomAsync({payload:{room, numberOfMafia}}: startGameActionType) {
  console.log("New Room is")
  const newRoom = yield* call(startGame, room, numberOfMafia)
  console.log(newRoom)
  yield* call(updateRoomAPICall, newRoom)
}

export function* wakeUpMafiaAsync({payload:{room}}: wakeUpMafiaActionType) {
  const newRoom = yield* call(wakeUpMafia, room)
  yield* call(updateRoomAPICall, newRoom)
}

export function* mafiaKillVoteAsync({payload:{room, mafiaUserID, victimUserID}}: mafiaCastKillVoteActionType) {
  const newRoom = yield* call(mafiaKillVote, room, mafiaUserID, victimUserID)
  yield* call(updateRoomAPICall, newRoom)
}

export function* mafiaFinalizeAsync({payload:{room}}: mafiaFinalizeVoteActionType) {
  const newRoom = yield* call(mafiaFinalizeVote, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* wakeUpDoctorAsync({payload:{room}}: wakeUpDoctorActionType) {
  const newRoom = yield* call(wakeUpDoctor, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* doctorSaveAsync({payload:{room, userToSave}}: doctorSaveActionType) {
  const newRoom = yield* call(doctorSave, room, userToSave)
  yield* call(updateRoomAPICall, newRoom)
}
export function* wakeUpPoliceAsync({payload:{room}}: wakeUpPoliceActionType) {
  const newRoom = yield* call(wakeUpPolice, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* policeDoneAsync({payload:{room}}: policeDoneActionType) {
  const newRoom = yield* call(putPoliceToSleep, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* showMafiaResultAsync({payload:{room}}: showMafiaResultActionType) {
  const newRoom = yield* call(showMafiaResult, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* endGameAsync({payload:{room}}: endGameActionType) {
  const newRoom = yield* call(endGame, room)
  yield* call(updateRoomAPICall, newRoom)
}
export function* openVillageVoteAsync({payload:{room}}: openVillageVoteActionType) {
  const newRoom = yield* call(openVillageVoting, room)
  yield* call(updateRoomAPICall, newRoom)
}


export function* villagerKillVoteAsync({payload:{room, killerUserID, victimUserID}}: villagerCastKillVoteActionType) {
  const newRoom = yield* call(villagerKillVote, room, killerUserID, victimUserID)
  yield* call(updateRoomAPICall, newRoom)
}

export function* freezeVillageVoteAsync({payload:{room}}: freezeVillageVoteActionType) {
  const newRoom = yield* call(freezeVillageVote, room)
  yield* call(updateRoomAPICall, newRoom)
}

export function* putVillageToSleepAsync({payload:{room}}: putVillageToSleepActionType) {
  const newRoom = yield* call(putVillageToSleep, room)
  yield* call(updateRoomAPICall, newRoom)
}

export function* removeUserFromRoomAsync({payload:{room, userID}}: deleteUserActionType) {
  const newRoom = yield* call(removeUser, room, userID)
  yield* call(updateRoomAPICall, newRoom)
} 

export function* onJoinRoomStart() { yield* takeLatest(GAME_ACTION_TYPES.JOIN_ROOM_START, joinRoomAsync); }
export function* onStartGame() { yield* takeLatest(GAME_ACTION_TYPES.START_GAME, startRoomAsync); }
export function* onWakeUpMafia() { yield* takeLatest(GAME_ACTION_TYPES.WAKEUP_MAFIA, wakeUpMafiaAsync); }
export function* onMafiaKillVote() { yield* takeLatest(GAME_ACTION_TYPES.MAFIA_KILL_VOTE, mafiaKillVoteAsync); }
export function* onMafiaFinalize() { yield* takeLatest(GAME_ACTION_TYPES.MAFIA_FINALIZE, mafiaFinalizeAsync); }
export function* onWakeUpDoctor() { yield* takeLatest(GAME_ACTION_TYPES.WAKEUP_DOCTOR, wakeUpDoctorAsync); }
export function* onDoctorSave() { yield* takeLatest(GAME_ACTION_TYPES.DOCTOR_SAVE, doctorSaveAsync); }
export function* onWakeUpPolice() { yield* takeLatest(GAME_ACTION_TYPES.WAKEUP_POLICE, wakeUpPoliceAsync); }
export function* onPoliceDone() { yield* takeLatest(GAME_ACTION_TYPES.POLICE_DONE, policeDoneAsync); }
export function* onShowMafiaResult() { yield* takeLatest(GAME_ACTION_TYPES.SHOW_MAFIA_RESULT, showMafiaResultAsync); }
export function* onEndGame() { yield* takeLatest(GAME_ACTION_TYPES.ENDGAME, endGameAsync); }
export function* onOpenVillageVote() { yield* takeLatest(GAME_ACTION_TYPES.OPEN_VILLAGE_VOTE, openVillageVoteAsync); }
export function* onVillagerKillVote() { yield* takeLatest(GAME_ACTION_TYPES.VILLAGER_KILL_VOTE, villagerKillVoteAsync); }
export function* onFreezeVillageVote() { yield* takeLatest(GAME_ACTION_TYPES.FREEZE_VILLAGE_VOTE, freezeVillageVoteAsync); }
export function* onPutVillageToSleep() { yield* takeLatest(GAME_ACTION_TYPES.PUT_VILLAGE_TO_SLEEP, putVillageToSleepAsync); }
export function* onRemoveUser() { yield* takeLatest(GAME_ACTION_TYPES.DELETE_USER, removeUserFromRoomAsync); }



export function* categoriesSaga() {
  yield* all([call(onJoinRoomStart), 
    call(onStartGame),
    call(onWakeUpMafia), 
    call(onMafiaKillVote), 
    call(onMafiaFinalize), 
    call(onWakeUpDoctor), 
    call(onDoctorSave),
    call(onWakeUpPolice),
    call(onPoliceDone), 
    call(onShowMafiaResult),
    call(onEndGame),
    call(onOpenVillageVote), 
    call(onVillagerKillVote),
    call(onFreezeVillageVote),
    call(onPutVillageToSleep),
    call(onRemoveUser)
  ]);
}
