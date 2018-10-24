import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { CheckBox } from '../Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0px 15px;
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

const Subject = styled.div`
  font-size: 12px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
`;

const TextBody = styled.div`
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
`;

const LeftBody = styled.div``;

const RightBody = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const UnreadCount = styled.span`
  background-color: rgb(247, 148, 30);
  color: rgb(234, 234, 234);
  font-size: 12px;
  float: right;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: row;
  padding: 0px 8px;
  border-radius: 50% !important;
  box-sizing: border-box;
`;

const DateTime = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: rgb(137, 137, 137);
  font-size: 14px;
`;

export const InboxItem = ({
  subject,
  sender,
  textBody,
  unread,
  dateTime,
  selected,
  onCheck,
  onSelect
}) => (
  <Wrapper onClick={onSelect}>
    <CheckBox checked={selected} onClick={onCheck} />
    <Content>
      <LeftBody>
        <Title>{sender}</Title>
        <Subject>{subject}</Subject>
        <TextBody>
          {textBody.slice(0, 3)}
          ...
        </TextBody>
      </LeftBody>
      <RightBody>
        {unread > 0 && <UnreadCount>{unread}</UnreadCount>}
        <DateTime>{moment(dateTime).format('MMM D')}</DateTime>
      </RightBody>
    </Content>
  </Wrapper>
);
