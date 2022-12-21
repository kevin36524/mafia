import styled from "styled-components"

export const DisabledScreen = () => {

    return (
        <Screen> </Screen>
    )
}

const Screen = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0, 0.1);
`;