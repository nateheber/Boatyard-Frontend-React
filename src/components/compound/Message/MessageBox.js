import React from 'react';
import styled from 'styled-components';

import { ChatItem } from 'components/basic/Message';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
`;

export const MessageBox = ({ chatHistory, secondary }) => (
  <Wrapper>
    {chatHistory.map((chat, key) => (
      <ChatItem secondary={secondary} {...chat} key={`chat_${key}`} />
    ))}
  </Wrapper>
);
