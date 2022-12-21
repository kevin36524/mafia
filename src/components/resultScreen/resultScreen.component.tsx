import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { endGameActionCreator, openVillageVoteActionCreator, putVillageToSleepActionCreator } from "../../store/game/game.action"
import { selectCurrentUser, selectRoom } from "../../store/game/game.selector"
import { GamePlayerState, GameRole, GameState, RoomUserRole } from "../../store/game/game.types"
import Button from "../button/button.component"

enum ResultState {
    noDecision,
    mafiaWon,
    villagersWon,
}

export const ResultScreen = () => {
    const room = useSelector(selectRoom)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    const resultState = (() => {
        let resultState = ResultState.noDecision
        if (!room || !room.game) {
            return resultState
        }
        const alivePlayers = Object.values(room.game.gamePlayers).filter(o => o.state === GamePlayerState.alive)
        const numberOfVillagers = alivePlayers.filter(o => o.role !== GameRole.mafia).length
        const numberOfMafia = alivePlayers.length - numberOfVillagers

        if (numberOfMafia === 0) {
            resultState = ResultState.villagersWon
        }
        
        if (numberOfMafia >= numberOfVillagers) {
            resultState = ResultState.mafiaWon
        }

        return resultState
    })()

    const message = (() => {
        let message = ""

        if (!room || !room.game) {
            return " No result "
        }

        if (room.game.gameState === GameState.mafiaVotingResult) {
            if (room.game.gamePlayers[room.game.mafiaFinalVote!].state === GamePlayerState.alive) {
                message += `No one was killed`;
            } else {
                message += `Mafia killed ${room.game.mafiaFinalVote}`
            }
        }

        if (room.game.gameState === GameState.villageVotingResult) {
            const gamePlayer = room.game.gamePlayers[room.game.villageFinalVote ?? ""]
            const playerType = gamePlayer.role === GameRole.mafia ? "Mafia" : "Villager"
            message += `Village killed ${room.game.villageFinalVote} who was a ${playerType}`
        }

        return message;
    }) ()

    const onDone = () => {
        if (!room || !room.game) {
            return
        }

        if (resultState === ResultState.noDecision) {
           if (room.game.gameState === GameState.villageVotingResult) {
              dispatch(putVillageToSleepActionCreator(room));
           }
           if (room.game.gameState === GameState.mafiaVotingResult) {
              dispatch(openVillageVoteActionCreator(room));
           }
           return
        }

        dispatch(endGameActionCreator(room))
    }
    return (
        <div>
            <h2>{message}</h2>
            {resultState === ResultState.mafiaWon && <h2> Mafia Won !!! </h2> }
            {resultState === ResultState.villagersWon && <h2> Villagers Won !!! </h2> }
            {(currentUser && currentUser.role === RoomUserRole.host) && <Button onClick={onDone}> DONE </Button>}
        </div>
    )
}