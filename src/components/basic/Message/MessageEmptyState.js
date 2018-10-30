import React from 'react';
import styled from 'styled-components';

import MessageImage from '../../../resources/read_message.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100px;
  margin-auto;
  margin-bottom: 15px;
`;

const EmptyText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: #333;
  font-size: 14px;
  text-align: center;
`;

export const MessageEmptyState = ({ text }) => (
  <Wrapper>
    <Image src={MessageImage} alt="message_icon" />
    <EmptyText>{text}</EmptyText>
  </Wrapper>
);
