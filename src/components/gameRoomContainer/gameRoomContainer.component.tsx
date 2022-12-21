import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateRoomActionCreator } from "../../store/game/game.action"
import { selectCurrentUser, selectRoom, selectRoomID } from "../../store/game/game.selector"
import { GameScreen } from "../../store/game/game.types"
import { startListeningForChangesOnRoom } from "../../utils/firebase.utils"
import { getScreenForState } from "../../utils/game.utils"
import { DoctorScreen } from "../doctorScreen/doctorScreen.component"
import GameRoomScreen from "../gameRoomScreen/gameRoomScreen.component"
import { MafiaVoteScreen } from "../mafiaVoteScreen/mafiaVoteScreen.component"
import { PoliceScreen } from "../policeScreen/policeScreen.component"
import { ResultScreen } from "../resultScreen/resultScreen.component"
import RevealRoleScreen from "../revealRoleScreen/revealRoleScreen.component"
import { StatusScreen } from "../statusScreen/statusScreen.component"
import { VillageSleepScreen } from "../villageSleepScreen/villageSleepScreen.component"
import { VillageVoteScreen } from "../villageVoteScreen/villageVoteScreen.component"

const GameRoomContainer = () => {
    const dispatch = useDispatch()
    const roomID = useSelector(selectRoomID)
    const room = useSelector(selectRoom)
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        if (!roomID) {return}

        const unsubscribe = startListeningForChangesOnRoom(roomID, (newRoomObj)=> {
            dispatch(updateRoomActionCreator(newRoomObj))
        });

        return unsubscribe;
    },[])

    console.log("I am here");
    const roomScreen = (() => {
        if (!room || !currentUser) {
            return <GameRoomScreen/>
        }
        const roomScreenType = getScreenForState(room, currentUser)

        switch(roomScreenType) {
            case GameScreen.initScreen: return <GameRoomScreen/>;
            case GameScreen.revealRoleScreen: return <RevealRoleScreen/>
            case GameScreen.sleepScreen: return <VillageSleepScreen/>
            case GameScreen.mafiaVotingScreen: return <MafiaVoteScreen/>
            case GameScreen.doctorScreen: return <DoctorScreen/>
            case GameScreen.policeScreen: return <PoliceScreen/>
            case GameScreen.resultScreen: return <ResultScreen/>
            case GameScreen.villageVotingScreen: return <VillageVoteScreen/>
            case GameScreen.waitForNextGameScreen: return <StatusScreen status="Game In Progress !! Please wait" />
        }

        return <StatusScreen status="Something is wrong"/>

    })()

    return (
        roomScreen
    )
}

export default GameRoomContainer