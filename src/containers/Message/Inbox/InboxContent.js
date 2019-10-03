import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { MessageEmptyState } from 'components/basic/Message';
import {
  MessageBox,
  ChatBox,
} from '../components';
import NewMessage from '../components/NewMessage';
import { InboxContentHeader } from '../components/MessageHeader';
import { profileSelector, refinedMessageSelector } from 'store/selectors/conversations';
import { GetConversation, CreateMessage } from 'store/actions/conversations';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
`;

class InboxContent extends React.Component {
  state = {
    timerId: -1,
  };

  componentWillMount() {
    this.loadConversation(true);
    const timerId = setInterval(this.loadConversation, 5000);
    this.setState({ timerId });
  }

  loadConversation = (first) => {
    const { conversationId, GetConversation } = this.props;
    if (conversationId !== -1) {
      GetConversation({
        conversationId,
        first
      });
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  getRecipientInfo = () => {
    const { conversationId, curConversation: {included} } = this.props;
    const conversationInfo = get(included, `[conversations][${conversationId}]`);
    const recipientInfo = get(conversationInfo, 'relationships.recipient.data');
    const { id } = recipientInfo;
    const recipientData = get(included, `[profiles][${id}]`);
    const info = get(recipientData, 'relationships.owner.data');
    const recipient_type = get(info, 'type') === 'users' ? 'User' : 'Provider';
    return { recipient_type, recipient_id: info.id };
  };

  onSendingSuccess = () => {
    this.loadConversation();
  }

  onSend = (message) => {
    const recipientInfo = this.getRecipientInfo();
    this.props.CreateMessage({
      data: {
        ...recipientInfo,
        message
      },
      error: (e) => toastr.error('Error', e.message),
      success: this.onSendingSuccess
    });
  }


  render() {

    const { empty, onBack, createNew, curConversation: {messages}, loading } = this.props;
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
        <MessageBox chatHistory={messages} loading={loading} inBox/>
        <ChatBox onSend={this.onSend} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: profileSelector(state),
  curConversation: refinedMessageSelector(state),
  loading: state.conversation.message.loading,
})

const mapDispatchToProps = {
  GetConversation,
  CreateMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxContent)
