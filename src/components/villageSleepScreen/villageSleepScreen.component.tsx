import { useDispatch, useSelector } from "react-redux"
import { doctorSaveActionCreator, policeDoneActionCreator, showMafiaResultActionCreator, wakeUpDoctorActionCreator, wakeUpMafiaActionCreator, wakeUpPoliceActionCreator } from "../../store/game/game.action"
import { isCurrentUserAliveSelector, selectCurrentUser, selectRoom } from "../../store/game/game.selector"
import { GamePlayerState, GameRole, GameState, GAME_ACTION_TYPES, RoomUserRole } from "../../store/game/game.types"
import { DisabledScreen } from "../disableScreen/disableScreen.component"
import { NavigationBar } from "../navigationBar/navbar.component"
import { StatusScreen } from "../statusScreen/statusScreen.component"


export const VillageSleepScreen = () => {

    const user = useSelector(selectCurrentUser)
    const room = useSelector(selectRoom)
    const dispatch = useDispatch()
    const isHost = user? user.role === RoomUserRole.host : false

    const titleString = (() => {
        if (!room || !room.game) {
            return ""
        }

        switch(room.game.gameState) {
            case GameState.policeAwake:
            case GameState.policeDone:
                return "WAIT FOR POLICE"
            
            case GameState.doctorAwake:
            case GameState.doctorDone:
                return "WAIT FOR DOCTOR"

            case GameState.mafiaAwake:
                return "WAIT FOR Mafia"
            
            case GameState.mafiaDone:
                return "Mafia Done"
            
            default:
                return room.game.gameState.valueOf()
        }

    })()

    const onNext = () => {
        if (!room || !room.game) {
            return
        }

        if (room.game.gameState === GameState.villageSleep) {
            dispatch(wakeUpMafiaActionCreator(room))
            return
        }

        if (room.game.gameState === GameState.mafiaDone) {
            const doctor = Object.values(room.game.gamePlayers).filter(o => o.role === GameRole.doctor )[0];
            if (doctor.state === GamePlayerState.alive) {
                dispatch(wakeUpDoctorActionCreator(room))
            } else {
                dispatch(doctorSaveActionCreator(room, ""))
            }
            return
        }

        if (room.game.gameState === GameState.doctorDone) {
            const police = Object.values(room.game.gamePlayers).filter(o => o.role === GameRole.police )[0];
            if (police.state === GamePlayerState.alive) {
                dispatch(wakeUpPoliceActionCreator(room))
            } else {
                dispatch(policeDoneActionCreator(room))
            }
            return
        }

        if (room.game.gameState === GameState.policeDone) {
            dispatch(showMafiaResultActionCreator(room))
            return
        }
        
    }

    const isAlive = useSelector(isCurrentUserAliveSelector);

    return (
        <div>
            {isHost && <NavigationBar onNext={onNext} title={titleString} /> }
            <StatusScreen status="Close Your Eyes !!"/>
            {!isAlive && <DisabledScreen></DisabledScreen> }
        </div>
    )
}