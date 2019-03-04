import React from 'react';
import styled from 'styled-components';
import deepEqual from 'deep-equal';

import { ChatItem } from 'components/basic/Message';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
`;

export class MessageBox extends React.Component {
  messagesEnd = React.createRef()

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.chatHistory, prevProps.chatHistory)) {
      this.scrollToBottom();
    }
  }

  render() {
    const { chatHistory, secondary } = this.props;
    return (
      <Wrapper>
        {chatHistory.map((chat, key) => (
          <ChatItem secondary={secondary} {...chat} key={`chat_${key}`} />
        ))}
        <div ref={this.messagesEnd} />
      </Wrapper>
    );
  }
}

