import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from '../../basic/Buttons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(230, 230, 230);
  padding: 25px 30px;
`;

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: rgb(7, 56, 75);
  font-size: 25px;
  text-transform: none;
  font-weight: 700;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
`;

export const InboxHeader = ({ selected, total, onCompose }) => (
  <Wrapper>
    <Title>
      Inbox {selected > 0 ? `(${selected} selected)` : `(${total})`}
    </Title>
    <OrangeButton onClick={onCompose}>Compose</OrangeButton>
  </Wrapper>
);
