export enum GAME_ACTION_TYPES {
    JOIN_ROOM_START = "game/JOIN_ROOM_START",
    JOIN_ROOM_SUCCESS = "game/JOIN_ROOM_SUCCESS",
    JOIN_ROOM_FAILED = "game/JOIN_ROOM_FAILED",

    UPDATE_ROOM = "game/UPDATE_ROOM",
    DELETE_ROOM = "game/DELETE_ROOM",

    START_GAME = "game/START_GAME", //roomUsers + numOfMafia
    WAKEUP_MAFIA = "game/WAKEUP_MAFIA",
    MAFIA_KILL_VOTE = "game/MAFIA_KILL_VOTE", 
    MAFIA_FINALIZE = "game/MAFIA_FINALIZE",
    WAKEUP_DOCTOR = "game/WAKEUP_DOCTOR",
    DOCTOR_SAVE = "game/DOCTOR_SAVE",
    WAKEUP_POLICE = "game/WAKEUP_POLICE",
    POLICE_DONE = "game/POLICE_DONE",
    SHOW_MAFIA_RESULT = "game/SHOW_MAFIA_RESULT",
    ENDGAME = "game/ENDGAME",
    OPEN_VILLAGE_VOTE = "game/OPEN_VILLAGE_VOTE",
    VILLAGER_KILL_VOTE = "game/VILLAGER_KILL_VOTE",
    FREEZE_VILLAGE_VOTE = "game/FREEZE_VILLAGE_VOTE",
    PUT_VILLAGE_TO_SLEEP = "game/PUT_VILLAGE_TO_SLEEP",
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
    game?: Game
}

export type rootStore = {
    currentUser: RoomUser,
}


// GAME roles
export enum GameRole {
    mafia = "mafia",
    villager = "villager",
    doctor = "doctor",
    police = "police",
}

export enum GamePlayerState {
    alive = "alive",
    dead = "dead",
}

export type GamePlayer = {
    userID: string,
    role: GameRole,
    state: GamePlayerState
}

export enum GameState {
    initState = "initState",
    revealRole = "revealRole",
    villageSleep = "villageSleep",
    mafiaAwake = "mafiaAwake",
    mafiaDone = "mafiaDone",
    doctorAwake = "doctorAwake",
    doctorDone = "doctorDone",
    policeAwake = "policeAwake",
    policeDone = "policeDone",
    mafiaVotingResult = "mafiaVotingResult",
    villageAwake = "villageAwake",
    villageVotingResult = "villageVotingResult",
}

export type Game = {
    numberOfMafia: number,
    gamePlayers: {[key:string]: GamePlayer},
    gameState: GameState,
    mafiaVotes?: {[key:string]: string}
    mafiaFinalVote?: string
    docSaveVote?: string
    villageVote?: {[key:string]: string}
    villageFinalVote?: string
}

export enum GameScreen {
    waitForNextGameScreen = "waitForNextGameScreen",
    initScreen = "initScreen",
    revealRoleScreen = "revealRoleScreen", // one button with show / hide button.
    sleepScreen = "sleepScreen", // close your eyes and sleep
    mafiaVotingScreen = "mafiaVotingScreen", // screen with all alive non-mafia in enabled state and showing which mafia picked which user.
    doctorScreen = "doctorScreen", // screen will all alive users
    policeScreen = "policeScreen", // screen with all alive members tapping on the user will show whether Villager or not.
    resultScreen = "resultScreen", // if gameState is mafiaResult then Mafia killed userid else village killed x and was a Mafia|villager
    villageVotingScreen = "villageVotingScreen" // screen with all alive members + show leading cadidate and who is voting whom.
}