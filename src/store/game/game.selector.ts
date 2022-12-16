import { createSelector } from 'reselect';

import { RootState } from '../store';

import { GameState } from './game.reducer';
import { AppScreens } from './game.types';

const selectGameStateReducer = (state: RootState): GameState => state.app;

export const selectCurrentUser = createSelector(
    [selectGameStateReducer],
    (gameState) => gameState.currentUser
)

export const selectRoomID = createSelector(
    [selectGameStateReducer],
    (gameState) => gameState.roomID
)
export const selectRoom = createSelector(
    [selectGameStateReducer],
    (gameState) => gameState.room
)

export const selectRoomUsers = createSelector(
    [selectRoom],
    (room) => room ? Object.values(room.users) : []
)

export const selectAppScreen = createSelector (
    [selectCurrentUser],
    (user) => !user ? AppScreens.joinRoom : AppScreens.gameRoom
)
// export const selectCartItems = createSelector(
//   [selectCartReducer],
//   (cart) => cart.cartItems
// );

// export const selectIsCartOpen = createSelector(
//   [selectCartReducer],
//   (cart) => cart.isCartOpen
// );

// export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
// );

// export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity * cartItem.price,
//     0
//   )
// );
