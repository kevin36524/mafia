import React from "react"
import { Container, Message } from "./statusScreen.style"


interface Props {
    status: string
}

export const StatusScreen: React.FC<Props> = ({status}) => {
    return(
          <Container>
            <Message> {status} </Message>
          </Container> 
    )
}