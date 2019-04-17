import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { get } from 'lodash';
import EvilIcon from 'react-evil-icons';

const Wrapper = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid #e6e6e6;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  .btn-close {
    transition: all ease-in-out .2s;
    opacity: 0;
    .close-icon {
      fill: white;
    }
  }
  &:hover {
    .btn-close {
      opacity: 1;
      .close-icon {
        fill: white;
      }
    }
  }
`;

const CloseButton = styled.button`
  background: no-repeat;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  outline: none;
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

export default ({ conversation: { conversation: { id }, mostRecentMessage, recipientProfile }, onClick, onDelete }) => {
  const name = recipientProfile.type === 'providers' ? get(recipientProfile, 'attributes.name') :
    `${get(recipientProfile, 'attributes.firstName') || ''} ${get(recipientProfile, 'attributes.lastName') || ''}`;
  return (
    <Wrapper onClick={onClick(id)}>
      <Label>{name}</Label>
      <InfoWrapper>
        <History>{get(mostRecentMessage, 'attributes.content')}</History>
        <TimeStamp>{moment(get(mostRecentMessage, 'attributes.createdAt')).format('MMM D')}</TimeStamp>
      </InfoWrapper>
      <CloseButton className="btn-close" onClick={onDelete(id)}>
        <EvilIcon name="ei-close-o" size="s" className="close-icon" />
      </CloseButton>
    </Wrapper>
  )
};
