import React from 'react';
import styled from 'styled-components';
import deepEqual from 'deep-equal';

import { ChatItem } from 'components/basic/Message';
import LoadingSpinner from 'components/basic/LoadingSpinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  position: relative;
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
    const { chatHistory, secondary, loading, inBox } = this.props;
    if (loading && !inBox) {
      return <LoadingSpinner color="white" />
    }
    return (
      <Wrapper>
        { loading && <LoadingSpinner color="#0D485F" opacity={0}/> }
        {chatHistory.map((chat, key) => (
          <ChatItem secondary={secondary} {...chat} key={`chat_${key}`} />
        ))}
        <div ref={this.messagesEnd} />
      </Wrapper>
    );
  }
}

