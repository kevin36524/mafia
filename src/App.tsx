import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import GameRoomContainer from './components/gameRoomContainer/gameRoomContainer.component';
import JoinRoomScreen from './components/joinRoomScreen/joinRoomScreen.component';
import { selectAppScreen } from './store/game/game.selector';
import { AppScreens } from './store/game/game.types';

function App() {
  const appScreen = useSelector(selectAppScreen) 

  console.log(`AppScreen is ${appScreen}`)
  let screen;
  if (appScreen === AppScreens.gameRoom) {
    screen = <GameRoomContainer/>;
  } else {
    screen = <JoinRoomScreen/>;
  }

  return (
    screen
  );
}


export default App;
