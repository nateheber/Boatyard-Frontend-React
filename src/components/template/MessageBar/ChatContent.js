import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MessageBox } from 'components/compound/Message/MessageBox';
import { ChatBox } from 'components/compound/Message/ChatBox';

import { GetConversation } from 'store/actions/conversations';
import { refinedMessageSelector } from 'store/selectors/conversations';

import BackImage from 'resources/back.svg';

const ChatHeader = styled.div`
  background-color: #07384b;
  border-bottom: 1px solid #aaa2aa;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

class ChatContent extends React.Component {
  componentDidMount() {
    const { conversationId, GetConversation } = this.props;
    GetConversation({ conversationId });
  }
  render() {
    const { onBack, messages } = this.props;
    return (
      <React.Fragment>
        <ChatHeader>
          <BackButton onClick={onBack}>
            <BackImg src={BackImage} alt="back" />
          </BackButton>
        </ChatHeader>
        <MessageWrapper>
          <MessageBox secondary chatHistory={messages} />
        </MessageWrapper>
        <ChatBox secondary />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ...refinedMessageSelector(state)
})

const mapDispatchToProps = {
  GetConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent)