import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { hasIn, get } from 'lodash';

import { CheckBox } from '../Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0px 15px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(7, 56, 75);
`;

const TextBody = styled.div`
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-right: 10px;
`;

const LeftBody = styled.div``;

const RightBody = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DateTime = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
  font-size: 14px;
`;

export const InboxItem = ({
  conversation: { id }, mostRecentMessage, recipientProfile,
  selected,
  onCheck,
  onSelect
}) => (
  <Wrapper onClick={onSelect}>
    <CheckBox checked={selected} onClick={onCheck} />
    <Content>
      <LeftBody>
        {
          hasIn(recipientProfile, 'attributes.name') ? (
            <Title>{get(recipientProfile, 'attributes.name')}</Title>
          ) : (
            <Title>{get(recipientProfile, 'attributes.firstName')} {get(recipientProfile, 'attributes.lastName')}</Title>
          )
        }
        <TextBody>
          {get(mostRecentMessage, 'attributes.content')}
        </TextBody>
      </LeftBody>
      <RightBody>
        <DateTime>{moment(get(mostRecentMessage, 'attributes.createdAt')).format('MMM D')}</DateTime>
      </RightBody>
    </Content>
  </Wrapper>
);
