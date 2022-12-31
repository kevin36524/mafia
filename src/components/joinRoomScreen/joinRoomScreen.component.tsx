import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const roomName = params.get("room") as string || "";
    const userName = params.get("user") as string || "";

    if (roomName.length > 0 && userName.length > 0) {
      dispatch(joinRoomStartActionCreator(roomName, userName));
      return;
    }

    setFormFields({roomName, userName})

  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(joinRoomStartActionCreator(roomName, userName));
    document.location.href = document.location.origin + document.location.pathname + `?room=${roomName}&user=${userName}`; 
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
