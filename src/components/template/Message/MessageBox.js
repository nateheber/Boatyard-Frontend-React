import React from 'react';
import styled from 'styled-components';
import deepEqual from 'deep-equal';

import { ChatItem } from 'components/basic/Message';
import LoadingSpinner from 'components/basic/LoadingSpinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding-bottom: 20px;
`;

export class MessageBox extends React.Component {
  messagesEnd = React.createRef()

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({ behavior: 'auto' });
    }
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.chatHistory, prevProps.chatHistory)) {
      this.scrollToBottom();
    }
  }

  render() {
    const { chatHistory, secondary, loading } = this.props;
    return loading ? <LoadingSpinner color="white" /> : (
      <Wrapper>
        {chatHistory.map((chat, key) => (
          <ChatItem secondary={secondary} {...chat} key={`chat_${key}`} />
        ))}
        <div ref={this.messagesEnd} />
      </Wrapper>
    );
  }
}

