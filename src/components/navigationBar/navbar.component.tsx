import React from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { endGameActionCreator } from "../../store/game/game.action";
import { selectRoom } from "../../store/game/game.selector";
import Button from "../button/button.component"
import { Container } from "./navbar.styles"

interface Props {
    onNext: () => void;
    title?: string
}

export const NavigationBar :React.FC<Props> = ({onNext, title}) => {
    const room = useSelector(selectRoom);
    const dispatch = useDispatch();

    const deleteRoom = () => {
        if (room) {
            dispatch(endGameActionCreator(room));
        }
    }
    return (
        <Container>
            <Button onClick={deleteRoom}> Delete Room </Button>
            {title && <h2> {title} </h2>}
            <Button onClick={onNext}> Next </Button>
        </Container>
    )
}