import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';

import { MessageEmptyState } from 'components/basic/Message';
import {
  MessageBox,
  ChatBox,
} from '../components';
import NewMessage from '../components/NewMessage';
import { InboxContentHeader } from '../components/MessageHeader';

import { GetConversation, CreateMessage } from 'store/actions/conversations';
import { refinedMessageSelector } from 'store/selectors/conversations';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

class InboxContent extends React.Component {
  state = {
    timerId: -1,
  }

  componentDidMount() {
    const { conversationId, GetConversation } = this.props;
    if (conversationId !== -1) {
      GetConversation({ conversationId, first: true });
      const timerId = setInterval(() => {
        GetConversation({ conversationId });
      }, 3000);
      this.setState({ timerId });
    }
  }

  componentDidUpdate(prevProps) {
    const { conversationId, GetConversation } = this.props;
    if (prevProps.conversationId !== conversationId) {
      if (conversationId !== -1) {
        GetConversation({ conversationId, first: true });
        const { timerId: curTimerId } = this.state;
        clearInterval(curTimerId);
        const timerId = setInterval(() => {
          GetConversation({ conversationId });
        }, 3000);
        this.setState({ timerId });
      }
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  getRecipientInfo = () => {
    const { included, conversationId } = this.props;
    const conversationInfo = get(included, `[conversations][${conversationId}]`);
    const recipientInfo = get(conversationInfo, 'relationships.recipient.data');
    const { id } = recipientInfo;
    const recipientData = get(included, `[profiles][${id}]`); 
    const info = get(recipientData, 'relationships.owner.data');
    const recipient_type = get(info, 'type') === 'users' ? 'User' : 'Provider';
    return { recipient_type, recipient_id: info.id };
  }

  onSendingSuccess = () => {
    const { conversationId, GetConversation } = this.props;
    GetConversation({ conversationId, first: false });
  }

  onSend = (data) => {
    const recipientInfo = this.getRecipientInfo();
    this.props.CreateMessage({
      data: {
        message: isEmpty(data.images) ? {
          content: data.text,
          ...recipientInfo,
        } : {
          content: data.text,
          file: {
            url: get(data, 'images[0]')
          },
          ...recipientInfo,
        }
      },
      success: this.onSendingSuccess
    });
  }


  render() {
    const { empty, onBack, createNew, messages } = this.props;
    return createNew ? (
      <Wrapper>
        <InboxContentHeader onBack={onBack} name="New Message" />
        <NewMessage
          onCancel={this.onCancelNew}
          onCreationSuccess={this.props.onSelect}
        />
      </Wrapper>
    ) : empty ? (
      <Wrapper>
        <MessageEmptyState text="No Message Selected" />
      </Wrapper>
    ) : (
      <Wrapper>
        <InboxContentHeader
          onBack={onBack}
        />
        <MessageBox chatHistory={messages} />
        <ChatBox onSend={this.onSend} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  ...refinedMessageSelector(state)
})

const mapDispatchToProps = {
  GetConversation,
  CreateMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxContent)
