import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { freezeVillageVoteActionCreator, villagerCastKillVoteActionCreator } from "../../store/game/game.action";
import { isCurrentUserAliveSelector, selectCurrentUser, selectRoom } from "../../store/game/game.selector";
import { GamePlayerState, RoomUserRole } from "../../store/game/game.types";
import { DisabledScreen } from "../disableScreen/disableScreen.component";
import { NavigationBar } from "../navigationBar/navbar.component";
import { UserList } from "../userList/userList.component";
import { VoteList } from "../voteList/voteList.component";
import { Container, NavbarContainer, UserListContainer, VoteListContainer } from "./villageVoteScreen.style";


export const VillageVoteScreen = () => {
    const room = useSelector(selectRoom);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isHost = (currentUser && currentUser.role === RoomUserRole.host) ?? false

    const onUserSelect = (userID: string) => {
        room && currentUser && dispatch(villagerCastKillVoteActionCreator(room, currentUser.userID, userID));
    }

    const onDone = () => {
        room && dispatch(freezeVillageVoteActionCreator(room));
    }

    const aliveVillagerUserIDs = (room && room.game 
        && Object.values(room.game.gamePlayers)
           .filter(o => o.state === GamePlayerState.alive)
           .map(o => o.userID)) || [];

    const voteObj = (room && room.game && room.game.villageVote) || {}
    const isAlive = useSelector(isCurrentUserAliveSelector)
    return (
        <Container>
            <NavbarContainer>
                { isHost && <NavigationBar onNext={onDone}/>}
                <h2> Pick one user who you want to kill. </h2>
            </NavbarContainer>
            <UserListContainer>
                <UserList userIDs={aliveVillagerUserIDs} onClick={onUserSelect}/>
            </UserListContainer>
            <VoteListContainer>
                <VoteList votes={voteObj} />
            </VoteListContainer>
            {!isAlive && <DisabledScreen></DisabledScreen> }
        </Container>
    )
    }
