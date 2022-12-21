import styled from "styled-components";


export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;


export const UserListContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

export const VoteListContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

export const DoneButtonContainer = styled.button`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
`;