import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { mafiaCastKillVoteActionCreator, mafiaFinalizeVoteActionCreator } from "../../store/game/game.action"
import { isCurrentUserAliveSelector, selectCurrentUser, selectRoom } from "../../store/game/game.selector"
import { GamePlayerState, GameRole } from "../../store/game/game.types"
import Button from "../button/button.component"
import { DisabledScreen } from "../disableScreen/disableScreen.component"
import { UserList } from "../userList/userList.component"
import { VoteList } from "../voteList/voteList.component"
import { Container, DoneButtonContainer, UserListContainer, VoteListContainer } from "./mafiaVoteScreen.style"


export const MafiaVoteScreen = () => {
    const room = useSelector(selectRoom);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const onUserSelect = (userID: string) => {
        room && currentUser && dispatch(mafiaCastKillVoteActionCreator(room, currentUser.userID, userID));
    }

    const onDone = () => {
        room && dispatch(mafiaFinalizeVoteActionCreator(room));
    }

    const aliveVillagerUserIDs = (room && room.game 
        && Object.values(room.game.gamePlayers)
           .filter(o => o.state === GamePlayerState.alive && o.role !== GameRole.mafia)
           .map(o => o.userID)) || [];

    const voteObj = (room && room.game && room.game.mafiaVotes) || {}
    const isAlive = useSelector(isCurrentUserAliveSelector);
    return (
        <Container>
            <UserListContainer>
                <UserList userIDs={aliveVillagerUserIDs} onClick={onUserSelect}/>
            </UserListContainer>
            <VoteListContainer>
                <VoteList votes={voteObj} />
            </VoteListContainer>
            <DoneButtonContainer>
             <Button onClick={onDone}> DONE </Button>
            </DoneButtonContainer>
            {!isAlive && <DisabledScreen></DisabledScreen> }
        </Container>
    )
}