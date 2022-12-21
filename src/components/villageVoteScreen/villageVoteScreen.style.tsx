import styled from "styled-components";


export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

export const NavbarContainer = styled.div`
    grid-column: 1 / 3;
    grid-row: 1 / 2;
`
export const UserListContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

export const VoteListContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
