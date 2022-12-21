import { createSelector } from 'reselect';

import { RootState } from '../store';

import { AppState } from './game.reducer';
import { AppScreens, GamePlayerState, GameScreen } from './game.types';
import { getScreenForState } from '../../utils/game.utils';

const selectAppStateReducer = (state: RootState): AppState => state.app;

export const selectCurrentUser = createSelector(
    [selectAppStateReducer],
    (AppState) => AppState.currentUser
)

export const selectRoomID = createSelector(
    [selectAppStateReducer],
    (AppState) => AppState.roomID
)
export const selectRoom = createSelector(
    [selectAppStateReducer],
    (AppState) => AppState.room
)

export const isCurrentUserAliveSelector = createSelector(
    [selectCurrentUser, selectRoom],
    (currentUser, room) => {
        if (!currentUser) {
            return false
        }
        const aliveUserIDs = (room && room.game && 
        Object.values(room.game.gamePlayers)
        .filter(o => o.state === GamePlayerState.alive)
        .map(o => o.userID)) || []

        return aliveUserIDs.indexOf(currentUser.userID) !== -1
    }
)

export const selectRoomUsers = createSelector(
    [selectRoom],
    (room) => room ? Object.values(room.users) : []
)

export const selectAppScreen = createSelector (
    [selectCurrentUser],
    (user) => !user ? AppScreens.joinRoom : AppScreens.gameRoom
)

export const selectGameScreens = createSelector (
    [selectRoom, selectCurrentUser],
    (room, user) => { 
        if (room && user) {
            return getScreenForState(room, user)
        }
        return GameScreen.waitForNextGameScreen;
    }
)