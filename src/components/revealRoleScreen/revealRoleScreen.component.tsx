import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { putVillageToSleepActionCreator } from "../../store/game/game.action";
import { selectCurrentUser, selectRoom } from "../../store/game/game.selector"
import { RoomUserRole } from "../../store/game/game.types";
import Button from "../button/button.component";
import { NavigationBar } from "../navigationBar/navbar.component";

const RevealRoleScreen = () => {

    const [getHidden, setHidden] = useState(true);
    const isHidden = getHidden;

    const currentUser = useSelector(selectCurrentUser);
    const isHost = currentUser!.role === RoomUserRole.host
    const room = useSelector(selectRoom);
    const currentGameUser = room!.game!.gamePlayers[currentUser!.userID]

    const dispatch = useDispatch()
    const toggleHidden = () => {
        setHidden(!isHidden)
    }

    const goToNext = () => {
        if (room) {
            dispatch(putVillageToSleepActionCreator(room))
        }
    }

    const buttonText = isHidden? "Reveal": "Hide"
    const infoText = isHidden? "Click on the button to Reveal your role" : currentGameUser.role.valueOf()

    return (
        <div>
            {isHost && <NavigationBar onNext={goToNext}/>}
            <h2> {infoText} </h2>
            <Button onClick={toggleHidden} > {buttonText} </Button>
        </div>
    )

}

export default RevealRoleScreen