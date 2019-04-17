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
  .overlay {
    transition: all ease-in-out .2s;
    opacity: 0;
  }
.btn-close {
    transition: all ease-in-out .2s;
    opacity: 0;
    .close-icon {
      fill: white;
    }
  }
  &:hover {
    .overlay {
      opacity: 1;
    }
    .btn-close {
      opacity: 1;
      .close-icon {
        fill: white;
      }
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
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
  justify-content: space-between;
  align-items: center;
`;

const History = styled.div`
  display: inline-block;
  max-width: 240px;
  color: #688da0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
      <Overlay className="overlay" />
      <CloseButton className="btn-close" onClick={onDelete(id)}>
        <EvilIcon name="ei-close-o" size="s" className="close-icon" />
      </CloseButton>
    </Wrapper>
  )
};
