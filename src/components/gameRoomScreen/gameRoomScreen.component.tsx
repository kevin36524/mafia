import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectRoomUsers, selectRoomID } from '../../store/game/game.selector';

import {
  GameRoomContainer,
} from './gameRoomScreen.styled';
import { Room } from '../../store/game/game.types';
import { startListeningForChangesOnRoom } from '../../utils/firebase.utils';
import { updateRoomActionCreator } from '../../store/game/game.action';

const GameRoomScreen = () => {
  const roomID = useSelector(selectRoomID) as string;
  const roomUsers = useSelector(selectRoomUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect is getting fired");
    const unsubscribe = startListeningForChangesOnRoom(roomID, (newRoomObj: Room) => {
      const updateRoomAction = updateRoomActionCreator(newRoomObj)
       dispatch(updateRoomAction)
       console.log(newRoomObj);
    });

    return unsubscribe
  },[])

  return (
    <GameRoomContainer>
      <h2> Game Room </h2>
      <div>
        {
          roomUsers.map((user) => <div key={user.userID}> {user.userName} </div>)
        }
      </div>
    </GameRoomContainer>
  );
};

export default GameRoomScreen;