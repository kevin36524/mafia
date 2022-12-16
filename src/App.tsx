import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import GameRoomScreen from './components/gameRoomScreen/gameRoomScreen.component';
import JoinRoomScreen from './components/joinRoomScreen/joinRoomScreen.component';
import { selectAppScreen } from './store/game/game.selector';
import { AppScreens } from './store/game/game.types';

function App() {
  const appScreen = useSelector(selectAppScreen) 

  let screen;
  if (appScreen == AppScreens.gameRoom) {
    screen = <GameRoomScreen/>;
  } else {
    screen = <JoinRoomScreen/>;
  }

  return (
    screen
  );
}


export default App;
