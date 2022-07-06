import styled from "styled-components";

export const EventContainer = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;

  .button {
    border: none;
    height: 100%;
  }

  .balanceBox {
    display: flex;
    width: 15.5rem;
    height: 2rem;   
    align-items: center;
    border-radius: none;
  }

  .status {
    display: flex;
    flex-direction: row;
    width: 12.2rem;
  }

  .buttonStatus {
    width: 4.6rem;
  }
`;
