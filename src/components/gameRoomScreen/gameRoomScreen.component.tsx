import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectRoomUsers, selectCurrentUser, selectRoom } from '../../store/game/game.selector';

import {
  GameRoomContainer,
} from './gameRoomScreen.styled';
import { RoomUserRole } from '../../store/game/game.types';
import { deleteUserActionCreator, startGameActionCreator } from '../../store/game/game.action';
import FormInput from '../form-input/form-input.component';
import { InvertedButton } from '../button/button.styles';
import { UserList } from '../userList/userList.component';

const defaultFormFields = {
  numberOfMafia: 1
}

const GameRoomScreen = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {numberOfMafia} = formFields;

  const room = useSelector(selectRoom);
  const roomUsers = useSelector(selectRoomUsers);
  const currentUser = useSelector(selectCurrentUser);

  const roomUserIDs = roomUsers.map(o => o.userID);
  const isHost = currentUser!.role === RoomUserRole.host;
  const dispatch = useDispatch();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Start the game with ${numberOfMafia} mafia`);
    if (room) {
      dispatch(startGameActionCreator(room, parseInt("" + numberOfMafia)));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const removeUser = (userID:string) => {
    if (isHost && room) {
      dispatch(deleteUserActionCreator(room, userID));
    }
  }

  useEffect(()=>{
    console.log("KEVINDEBUG I am in roomUser useEffect");
    if (currentUser && room) {
      if (roomUserIDs.indexOf(currentUser.userID) === -1) {
        document.location.href = document.location.origin + document.location.pathname + `?room=${room.id}`
      }
    }
  },[roomUsers])

  return (
    <GameRoomContainer>
      <h2> Game Room {room?.id ?? ""}, User {currentUser?.userName ?? ""} </h2>

      <UserList userIDs={roomUserIDs} onClick={removeUser} />
      {  isHost ? (
        <form onSubmit= {handleSubmit}>
          <FormInput 
            label='Number of Mafia'
            type='number'
            required
            onChange={handleChange}
            name='numberOfMafia'
            value={numberOfMafia}
          />

          <InvertedButton type="submit"> Start Game </InvertedButton>  
        </form>
      ) : (<p> Waiting for Others </p>) }
    </GameRoomContainer>
  );
};

export default GameRoomScreen;