import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { OrangeButton } from 'components/basic/Buttons';
import { MessageBox } from 'components/compound/Message/MessageBox';
import { ChatBox } from 'components/compound/Message/ChatBox';

import BackImage from 'resources/back.svg';

import ChatTrigger from './ChatTrigger';

const Wrapper = styled.div`
  position: absolute;
  height: calc(100vh - 68px) !important;
  width: 350px;
  background-color: #01556d;
  transition: right 1s;
  &.show {
    right: 0px;
  }
  &.hide {
    right: -350px;
  }
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-bottom: solid 1px #e6e6e6;
`;

const ChatHeader = styled.div`
  background-color: #07384b;
  border-bottom: 1px solid #aaa2aa;
  padding: 15px 0;
`;

const MessageWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const BackButton = styled.button`
  outline: none;
  background-color: transparent;
  z-index: 9999;
  padding: 1px 7px 2px;
  border: none;
  margin: 10px;
  cursor: pointer;
`;

const BackImg = styled.div`
  width: 13px;
  height: 22px;
  mask: url(${props => props.src});
  mask-repeat: no-repeat;
  mask-size: 13px 22px;
  background-color: white;
`;

const history = [
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body:
      'test test test test test test test stest teste set set set set',
    own: true
  },
  {
    name: 'Brock Prod Test 9 Donnelly',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: false
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Brock Prod Test 9 Donnelly',
    time: '2018/10/21 23:20:10',
    body:
      'test test test test test test test stest teste set set set set',
    own: false
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Daniel',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: true
  },
  {
    name: 'Brock Prod Test 9 Donnelly',
    time: '2018/10/21 23:20:10',
    body: 'test',
    own: false
  },
  { name: 'Daniel', time: '2018/10/21 23:20:10', body: 'test', own: true }
];

const items = [
  {
    id: 1,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 0,
    dateTime: new Date('2018/10/1')
  },
  {
    id: 2,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 1,
    dateTime: new Date('2018/10/2')
  },
  {
    id: 3,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 0,
    dateTime: new Date('2018/10/21')
  }
];

export default class MessageBar extends React.Component {
  state = {
    selected: -1,
    newMessage: false,
  };

  onNew = () => {
    this.setState({ newMessage: true });
  }

  onSelect = id => () => {
    this.setState({ selected: id });
  }

  onBack = () => {
    this.setState({ selected: -1, newMessage: false });
  }

  render() {
    const { show } = this.props;
    const { selected, newMessage } = this.state;
    return (
      <Wrapper className={show ? 'show' : 'hide'}>
        { newMessage &&
          <React.Fragment>
            <ChatBox />
          </React.Fragment>
        }
        {selected === -1 && !newMessage && 
          <React.Fragment>
            <SearchWrapper>
              <SearchBox style={{ width: '100%', marginBottom: '15px' }} />
              <OrangeButton  style={{ width: '100%' }} onClick={this.onNew} >Compose</OrangeButton>
            </SearchWrapper>
            {
              items.map((item, idx) => (
                <ChatTrigger item={item} onClick={this.onSelect} key={`item_${idx}`} />
              ))
            }
          </React.Fragment>
        }
        {selected !== -1 && !newMessage &&
          <React.Fragment>
            <ChatHeader>
              <BackButton onClick={this.onBack}>
                <BackImg src={BackImage} alt="back" />
              </BackButton>
            </ChatHeader>
            <MessageWrapper>
              <MessageBox secondary chatHistory={history} />
            </MessageWrapper>
            <ChatBox secondary />
          </React.Fragment>
        }
      </Wrapper>
    )
  }
}