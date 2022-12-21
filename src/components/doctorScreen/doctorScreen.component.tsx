import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { doctorSaveActionCreator } from "../../store/game/game.action"
import { isCurrentUserAliveSelector, selectRoom } from "../../store/game/game.selector"
import { GamePlayerState } from "../../store/game/game.types"
import { DisabledScreen } from "../disableScreen/disableScreen.component"
import { UserList } from "../userList/userList.component"


export const DoctorScreen = () => {

    const room = useSelector(selectRoom)
    const aliveUserIDs = (room && room.game && 
        Object.values(room.game.gamePlayers)
        .filter(o => o.state === GamePlayerState.alive)
        .map(o => o.userID)) || []

    const isAlive = useSelector(isCurrentUserAliveSelector)
    const dispatch = useDispatch();
    const onClick = (userID: string) => {
       room && dispatch(doctorSaveActionCreator(room, userID));
    }

    return (
        <div>
            <h2> Who do you want to save? </h2>
            <UserList userIDs={aliveUserIDs} onClick={onClick} />
            {!isAlive && <DisabledScreen></DisabledScreen> }
        </div>
    )
}