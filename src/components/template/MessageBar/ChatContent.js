import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty, get } from 'lodash';

import { MessageBox } from 'components/template/Message/MessageBox';
import ChatBox from 'components/template/Message/ChatBox';

import { GetConversation, CreateMessage } from 'store/actions/conversations';
import { profileSelector } from 'store/selectors/conversations';
import { refineMessage } from 'utils/conversations';

import BackImage from 'resources/back.svg';

const ChatHeader = styled.div`
  background-color: #07384b;
  border-bottom: 1px solid #aaa2aa;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

const RecipientName = styled.div`
  display: flex;
  flex: 1;
  padding-right: 36px;
  justify-content: center;
  color: white;
  font-size: 22px;
  text-align: center;
`;

class ChatContent extends React.Component {
  state = {
    timerId: -1,
    messages: [],
    included: [],
    loading: false,
    isMounted: false,
  }

  componentDidMount() {
    this.updateConversation(true);
    const timerId = setInterval(() => {
      this.updateConversation();
    }, 3000);
    this.setState({ timerId, isMounted: true });
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    this.setState({ isMounted: false });
    clearInterval(timerId);
  }

  updateConversation = (first = false) => {
    const { conversationId, GetConversation, profile } = this.props;
    if (first) {
      this.setState({ loading: true });
    }
    GetConversation({
      conversationId,
      onlyCallback: true,
      success: (message) => {
        const { isMounted } = this.state;
        if (isMounted) {
          this.setState({ ...refineMessage(profile, message), loading: false });
        }
      }
    });
  }

  getRecipientInfo = () => {
    const { conversationId } = this.props;
    const { included } = this.state;
    const conversationInfo = get(included, `[conversations][${conversationId}]`);
    const recipientInfo = get(conversationInfo, 'relationships.recipient.data');
    const { id } = recipientInfo;
    const recipientData = get(included, `[profiles][${id}]`); 
    const info = get(recipientData, 'relationships.owner.data');
    const recipient_type = get(info, 'type') === 'users' ? 'User' : 'Provider';
    return { recipient_type, recipient_id: info.id };
  }

  getRecipientName = () => {
    const { conversationId } = this.props;
    const { included } = this.state;
    const conversationInfo = get(included, `[conversations][${conversationId}]`);
    const recipientInfo = get(conversationInfo, 'relationships.recipient.data');
    const id = get(recipientInfo, 'id');
    const recipientData = get(included, `[profiles][${id}]`); 
    const info = get(recipientData, 'relationships.owner.data');
    const recipientType = get(info, 'type');
    const recipientId = get(info, 'id');
    const profileInfo = get(included, `[${recipientType}][${recipientId}].attributes`);
    if (recipientType === 'users') {
      const firstName = get(profileInfo, 'firstName', '') || '';
      const lastName = get(profileInfo, 'lastName', '') || '';
      return `${firstName} ${lastName}`;
    } else if (recipientType === 'providers') {
      return get(profileInfo, 'name', '');
    }
    return '';
  }

  onSendingSuccess = () => {
    const { conversationId, GetConversation } = this.props;
    GetConversation({ conversationId, first: false });
  }

  onSend = (data) => {
    const recipientInfo = this.getRecipientInfo();
    this.props.CreateMessage({
      data: {
        message: isEmpty(data.image) ? {
          content: data.text,
          ...recipientInfo,
        } : {
          content: data.text,
          file: get(data, 'image'),
          ...recipientInfo,
        }
      },
      success: this.onSendingSuccess
    });
  }

  render() {
    const { onBack } = this.props;
    const { messages, loading } = this.state;
    const recipientName = this.getRecipientName();
    return (
      <React.Fragment>
        <ChatHeader>
          <BackButton onClick={onBack}>
            <BackImg src={BackImage} alt="back" />
          </BackButton>
          <RecipientName>{recipientName}</RecipientName>
        </ChatHeader>
        <MessageWrapper>
          <MessageBox secondary loading={loading} chatHistory={messages} />
        </MessageWrapper>
        <ChatBox secondary onSend={this.onSend} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: profileSelector(state),
})

const mapDispatchToProps = {
  GetConversation,
  CreateMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent)