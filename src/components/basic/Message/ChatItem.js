import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { find } from 'lodash';

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
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
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
  padding: 10px 15px;
  position: relative;
  margin-bottom: 0 !important;
  max-width: 250px;
  background-color: #f6f6f6;
  word-wrap: break-word;
  hyphens: auto;
  &.own {
    background-color: #E6E6E6;
    border-bottom-right-radius: 2px;
    &.has-prev {
      // border-top-right-radius: 2px;
    }
  }
  &.op {
    // border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    &.has-next {
      // border-bottom-left-radius: 2px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  cursor: pointer;
`

const Attachments = ({items}) => {
  if (!items || items.length === 0) {
    return null;
  }
  const urls = items.map(item => item.attributes.fileAttachment.url);
  const concatedUrls = urls.join(',');
  if (urls.length === 2 && concatedUrls.indexOf('thumb-') > -1 && concatedUrls.indexOf('origin-') > -1) {
    const thumbUrl = find(urls, l => l.indexOf('thumb-') > -1);
    const originUrl = find(urls, l => l.indexOf('origin-') > -1);
    return <Image src={thumbUrl} onClick={ev => window.open(originUrl, '_blank')} />
  }
  return <></>
}

export class ChatItem extends React.Component {
  handleDownload(file) {
    window.open(file, '_blank');
  }

  render() {
    const { name, time, body, own, secondary, attachments, showDate, hasPrev, hasNext } = this.props;
    return (
      <Wrapper className={`${own ? 'own' : 'op'} ${hasPrev ? 'has-prev': ''} ${hasNext ? 'has-next' : ''}`}>
        {showDate && <DateContainer>
          <DateText>{moment(time).format('MMM D, YYYY')}</DateText>
        </DateContainer>}
        {!hasPrev && <UserDetailsCotainer>
          {!own && <DisplayName className={secondary ? 'secondary' : 'primary'}>{`${name}`}&nbsp;</DisplayName>}
          <TimeText>{moment(time).format('h:mm A')}</TimeText>
        </UserDetailsCotainer>}
        <MessageBody className={`${own ? 'own' : 'op'} ${hasPrev ? 'has-prev': ''} ${hasNext ? 'has-next' : ''}`}>
          {body}
          <Attachments items={attachments} />
        </MessageBody>
      </Wrapper>
    );
  }
}
