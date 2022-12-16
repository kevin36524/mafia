import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { JoinRoomContainer } from './joinRoomScreen.styled';
import { joinRoomStartActionCreator } from '../../store/game/game.action';

const defaultFormFields = {
  roomName: '',
  userName: '',
};

const JoinRoomScreen = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { roomName, userName } = formFields;
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(joinRoomStartActionCreator(roomName, userName));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <JoinRoomContainer>
      <h2>Join Mafia room</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Room Name'
          type='text'
          required
          onChange={handleChange}
          name='roomName'
          value={roomName}
        />

        <FormInput
          label='User Name'
          type='text'
          required
          onChange={handleChange}
          name='userName'
          value={userName}
        />

        <Button type='submit'>Join Room</Button>
      </form>
    </JoinRoomContainer>
  );
};

export default JoinRoomScreen;
