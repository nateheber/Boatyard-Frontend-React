import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &.own {
    align-items: flex-end;
  }
  padding: 18px 30px;
`;

const DisplayName = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px !important;
  font-weight: bold;
  margin-bottom: 15px;
  &.own {
    text-align: right;
  }
  &.primary {
    color: #07384b;
  }
  &.secondary {
    color: #E6E6E6;
  }
`;

const DateTime = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 12px !important;
  margin-top: 5px;
  color: #939393 !important;
`;

const MessageBody = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px !important;
  border-radius: 6px !important;
  padding: 10px;
  position: relative;
  margin-bottom: 0 !important;
  max-width: 250px;
  min-width: 70px;
  background-color: #f6f6f6;
  &.own {
    background-color: #ffd4aa;
  }
  &:before {
    content: ' ';
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    top: -5px;
    position: absolute;
  }
  &.op:before {
    left: 5px;
    border-bottom: 12px solid #f6f6f6;
  }
  &.own:before {
    right: 5px;
    border-bottom: 12px solid #ffd4aa;
  }
`;

export const ChatItem = ({ name, time, body, own, secondary, file }) => {
  console.log(file);
  return (
    <div>
      <Wrapper className={own ? 'own' : 'op'}>
        <DisplayName className={secondary ? 'secondary' : 'primary'}>{name}</DisplayName>
        <MessageBody className={own ? 'own' : 'op'}>{body}</MessageBody>
        <DateTime>{moment(time).format('MMM D, YYYY h:m A')}</DateTime>
      </Wrapper>
    </div>
  );
};
