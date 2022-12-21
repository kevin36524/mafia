
import { GamePlayer, GamePlayerState, GameRole, GameScreen, GameState, Room, RoomUser, RoomUserRole } from "../store/game/game.types";

export const startGame = (room:Room, numOfMafia: number): Room => {
    const newRoom = {...room}
    let allUsers = Object.values(room.users)
    const participantObj:{[key:string]: GamePlayer} = {}

    for (let i =0; i< numOfMafia + 2; i++) {
       const idx = Math.floor(Math.random() * allUsers.length);
       const mafiaUser = allUsers.splice(idx, 1)[0];
       participantObj[mafiaUser.userID] = {
            userID : mafiaUser.userID,
            role : i < numOfMafia ? GameRole.mafia : (i == numOfMafia ? GameRole.doctor : GameRole.police),
            state : GamePlayerState.alive,
       }
    }

    allUsers.forEach((roomUser)=> {
        participantObj[roomUser.userID] = {
            userID : roomUser.userID,
            role : GameRole.villager,
            state : GamePlayerState.alive,
       }
    })

    newRoom.game = {
        numberOfMafia: numOfMafia,
        gamePlayers: participantObj,
        gameState: GameState.revealRole,
    }
    return newRoom
}

export const wakeUpMafia = (room:Room):Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    delete(newRoom.game.villageVote)
    delete(newRoom.game.villageFinalVote)
    newRoom.game.gameState = GameState.mafiaAwake;
    return newRoom
}

export const mafiaKillVote = (room:Room, mafaiUserID:string, victimUserID: string):Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }

    if (!newRoom.game.mafiaVotes) {
        newRoom.game.mafiaVotes = {}
    }
    
    newRoom.game.mafiaVotes[mafaiUserID] = victimUserID;

    newRoom.game.mafiaFinalVote = maxOccurance(Object.values(newRoom.game.mafiaVotes)) ?? undefined;

    return newRoom
}

export const mafiaFinalizeVote = (room: Room): Room => {
    const newRoom = {...room}
    newRoom.game!.gameState = GameState.mafiaDone
    return newRoom
}

export const wakeUpDoctor = (room:Room): Room => {
    const newRoom = {...room}
    newRoom.game!.gameState = GameState.doctorAwake
    return newRoom
}

export const doctorSave = (room:Room, userID: string): Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    newRoom.game.docSaveVote = userID;
    newRoom.game.gameState = GameState.doctorDone;

    return newRoom
}

export const wakeUpPolice  = (room:Room): Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    newRoom.game.gameState = GameState.policeAwake;
    return newRoom
}

export const putPoliceToSleep = (room:Room) : Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    newRoom.game.gameState = GameState.policeDone;
    return newRoom
}

export const showMafiaResult = (room:Room) : Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    if (newRoom.game.mafiaFinalVote !== newRoom.game.docSaveVote) {    
        newRoom.game.gamePlayers[newRoom.game.mafiaFinalVote ?? ""].state = GamePlayerState.dead;
    }
    newRoom.game.gameState = GameState.mafiaVotingResult;

    return newRoom
}

export const endGame = (room:Room) : Room => {
    const newRoom = {...room}
    delete(newRoom.game);
    return newRoom
}

export const openVillageVoting = (room:Room) : Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    delete(newRoom.game.mafiaVotes)
    delete(newRoom.game.mafiaFinalVote)
    delete(newRoom.game.docSaveVote)

    newRoom.game.gameState = GameState.villageAwake;
    return newRoom
}

export const villagerKillVote = (room:Room, killerID: string, victimID: string): Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }

    if (!newRoom.game.villageVote) {
        newRoom.game.villageVote = {}
    }
    
    newRoom.game.villageVote[killerID] = victimID;

    newRoom.game.villageFinalVote = maxOccurance(Object.values(newRoom.game.villageVote)) ?? undefined;

    return newRoom
}

export const freezeVillageVote = (room:Room) : Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    if (newRoom.game.villageFinalVote) {
        newRoom.game.gamePlayers[newRoom.game.villageFinalVote].state = GamePlayerState.dead;
    }
    newRoom.game!.gameState = GameState.villageVotingResult
    return newRoom
}

export const putVillageToSleep = (room:Room) : Room => {
    const newRoom = {...room}
    if (!newRoom.game) {
        return newRoom
    }
    newRoom.game.gameState = GameState.villageSleep;
    return newRoom
}

export const getScreenForState = (room: Room, currentUser: RoomUser): GameScreen => {
    if (!room.game) {
        return GameScreen.initScreen;
    }
    const gamePlayer = room.game.gamePlayers[currentUser.userID];
    if (!gamePlayer || (gamePlayer.state === GamePlayerState.dead && currentUser.role !== RoomUserRole.host)) {
        return GameScreen.waitForNextGameScreen
    }
    switch(room.game.gameState) {
        case GameState.revealRole: {
            return GameScreen.revealRoleScreen;
        }
        case GameState.mafiaAwake: {
            return gamePlayer.role === GameRole.mafia ?  GameScreen.mafiaVotingScreen : GameScreen.sleepScreen
        }
        case GameState.villageSleep: 
        case GameState.mafiaDone:
        case GameState.policeDone:
        case GameState.doctorDone: {
            return GameScreen.sleepScreen
        }
        case GameState.doctorAwake: {
            return gamePlayer.role === GameRole.doctor? GameScreen.doctorScreen : GameScreen.sleepScreen
        }
        case GameState.policeAwake: {
            return gamePlayer.role === GameRole.police? GameScreen.policeScreen : GameScreen.sleepScreen
        }
        case GameState.mafiaVotingResult:
        case GameState.villageVotingResult: {
            return GameScreen.resultScreen
        }
        case GameState.villageAwake: {
            return GameScreen.villageVotingScreen
        }
        default:
            return GameScreen.waitForNextGameScreen
    }
}

// util functions
function maxOccurance(arr: string[]) {
    // Create an empty object to store the counts of each element
    const counts:{[key:string]: number} = {};
  
    // Iterate over the array and increment the count of each element in the object
    for (const elem of arr) {
      if (counts[elem]) {
        counts[elem]++;
      } else {
        counts[elem] = 1;
      }
    }
  
    // Find the element with the maximum count
    let maxCount = 0;
    let maxElem = null;
    for (const [elem, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxElem = elem;
      }
    }
  
    return maxElem;
  }
  

// START_GAME = "game/START_GAME", //roomUsers + numOfMafia
// WAKEUP_MAFIA = "game/WAKEUP_MAFIA",
// MAFIA_KILL_VOTE = "game/MAFIA_KILL_VOTE", 
// MAFIA_FINALIZE = "game/MAFIA_FINALIZE",
// WAKEUP_DOCTOR = "game/WAKEUP_DOCTOR",
// DOCTOR_SAVE = "game/DOCTOR_SAVE",
// WAKEUP_POLICE = "game/WAKEUP_POLICE",
// POLICE_DONE = "game/POLICE_DONE",
// SHOW_MAFIA_RESULT = "game/SHOW_MAFIA_RESULT",
// ENDGAME = "game/ENDGAME",
// OPEN_VILLAGE_VOTE = "game/OPEN_VILLAGE_VOTE",
// VILLAGER_KILL_VOTE = "game/VILLAGER_KILL_VOTE",
// FREEZE_VILLAGE_VOTE = "game/FREEZE_VILLAGE_VOTE",
