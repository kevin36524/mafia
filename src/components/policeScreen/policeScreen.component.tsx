import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { policeDoneActionCreator } from "../../store/game/game.action"
import {isCurrentUserAliveSelector, selectRoom } from "../../store/game/game.selector"
import { GamePlayerState, GameRole } from "../../store/game/game.types"
import Button from "../button/button.component"
import { DisabledScreen } from "../disableScreen/disableScreen.component"
import { UserList } from "../userList/userList.component"


export const PoliceScreen = () => {

    const room = useSelector(selectRoom)
    const aliveUserIDs = (room && room.game && Object.values(room.game.gamePlayers).filter(o => o.state === GamePlayerState.alive).map(o => o.userID)) || [];

    const [selectedUserID, setSelectedUserID] = useState("")

    const onClick = (userID: string) => {
        setSelectedUserID(userID);
    }
    const dispatch = useDispatch()
    const onDone = () => {
       room && dispatch(policeDoneActionCreator(room));
    }

    const selectedGamePlayerRole = (room && selectedUserID && room.game && room.game.gamePlayers[selectedUserID].role === GameRole.mafia) ? "Mafia" : "Villager"
    const isDonePicking = selectedUserID.length > 0

    const isAlive = useSelector(isCurrentUserAliveSelector)

    const pickerScreen = (
        <div>
            <h2>Whose identity you would like to know</h2>
            <UserList userIDs={aliveUserIDs} onClick = {onClick}/>
        </div>
    )
    const revealIdentityScreen = (
        <div>
            <h2> {selectedUserID} is {selectedGamePlayerRole} </h2>
            <Button onClick={onDone}> DONE </Button>
            {!isAlive && <DisabledScreen></DisabledScreen> }
        </div>
    )

    return isDonePicking ? revealIdentityScreen : pickerScreen
}