import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash';

const Wrapper = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid #e6e6e6;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const Label = styled.div`
  margin: 0;
  padding-bottom: 5px;
  color: #E6E6E6;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const History = styled.div`
  display: inline-block;
  color: #688da0;
`;

const TimeStamp = styled.div`
  display: inline-block;
  color: #688da0;
`;

export default ({ conversation: { conversation: { id }, messages, recipientProfile }, onClick }) => {
  const name = recipientProfile.type === 'providers' ? get(recipientProfile, 'attributes.name') :
    `${get(recipientProfile, 'attributes.firstName') || ''} ${get(recipientProfile, 'attributes.lastName') || ''}`;
  return (
    <Wrapper onClick={onClick(id)}>
      <Label>{name}</Label>
      <InfoWrapper>
        <History>{get(messages, '0.attributes.content', '')}</History>
        <TimeStamp>{messages.length > 0 && moment(messages[0].attributes.createdAt).format('MMM D')}</TimeStamp>
      </InfoWrapper>
    </Wrapper>
  )
};
