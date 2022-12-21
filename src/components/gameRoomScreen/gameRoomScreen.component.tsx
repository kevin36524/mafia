import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectRoomUsers, selectCurrentUser, selectRoom } from '../../store/game/game.selector';

import {
  GameRoomContainer,
} from './gameRoomScreen.styled';
import { RoomUserRole } from '../../store/game/game.types';
import { startGameActionCreator } from '../../store/game/game.action';
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

  return (
    <GameRoomContainer>
      <h2> Game Room {room?.id ?? ""} </h2>

      <UserList userIDs={roomUserIDs}/>
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