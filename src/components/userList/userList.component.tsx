
import React from "react"
import { Item, List } from "./userList.style";

interface Props {
    userIDs: string[];
    onClick?: (userID: string) => void;
  }
  
export const UserList: React.FC<Props> = ({ userIDs, onClick }) => {
    return (
      <List>
        {userIDs.map((userID) => (
          <Item key={userID} onClick={() => onClick && onClick(userID)}>
            {userID}
          </Item>
        ))}
      </List>
    );
  };