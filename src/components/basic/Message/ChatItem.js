import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { isEmpty } from 'lodash';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px 0;
  &.own {
    align-items: flex-end;
  }
  &.has-prev {
    padding-top: 5px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const LineDivider = styled.div`
  background: #BBB;
  height: 1px;
  width: 100px;
`;

const DateText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #BBB;
`;

const UserDetailsCotainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const DisplayName = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px !important;
  font-weight: bold;
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

const TimeText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #939393;
`;

const MessageBody = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px !important;
  border-radius: 13px;
  padding: 10px;
  position: relative;
  margin-bottom: 0 !important;
  max-width: 250px;
  min-width: 70px;
  background-color: #f6f6f6;
  &.own {
    background-color: #ffd4aa;
    text-align: right;
    border-bottom-right-radius: 2px;
    &.has-prev {
      border-top-right-radius: 2px;
    }
  }
  &.op {
    border-top-left-radius: 2px;
    &.has-next {
      border-bottom-left-radius: 2px;
    }
  }
  // &:before {
  //   content: ' ';
  //   width: 0;
  //   height: 0;
  //   border-left: 16px solid transparent;
  //   border-right: 16px solid transparent;
  //   top: -5px;
  //   position: absolute;
  // }
  // &.op:before {
  //   left: 5px;
  //   border-bottom: 12px solid #f6f6f6;
  // }
  // &.own:before {
  //   right: 5px;
  //   border-bottom: 12px solid #ffd4aa;
  // }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
`

export class ChatItem extends React.Component {
  render() {
    const { name, time, body, own, secondary, file, showDate, hasPrev, hasNext } = this.props;
    return (
      <Wrapper className={`${own ? 'own' : 'op'} ${hasPrev ? 'has-prev': ''} ${hasNext ? 'has-next' : ''}`}>
        {showDate && <DateContainer>
          <LineDivider />
          <DateText>{moment(time).format('MMM D, YYYY')}</DateText>
          <LineDivider />
        </DateContainer>}
        {!hasPrev && <UserDetailsCotainer>
          {!own && <DisplayName className={secondary ? 'secondary' : 'primary'}>{`${name}`}&nbsp;</DisplayName>}
          {/* <DateTime>{moment(time).format('MMM D, YYYY h:m A')}</DateTime> */}
          <TimeText>{moment(time).format('h:mm A')}</TimeText>
        </UserDetailsCotainer>}
        <MessageBody className={`${own ? 'own' : 'op'} ${hasPrev ? 'has-prev': ''} ${hasNext ? 'has-next' : ''}`}>
          {body}
          { !isEmpty(file) && <Image src={file} /> }
        </MessageBody>
      </Wrapper>
    );
  }
}
