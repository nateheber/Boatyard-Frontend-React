import styled from 'styled-components';

export const MessageItem = styled.div`
  padding: 15px 25px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-flow: column;
  border-bottom: 1px solid rgb(230, 230, 230);
  cursor: pointer;
  &.active {
    background-color: rgb(245, 245, 245);
  }
  min-height: 56px;
`;
