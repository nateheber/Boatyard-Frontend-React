import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';
import { GetNetworks } from 'store/actions/networks';
import { GetConversations, GetConversation, DeleteConversation, SetMessageBarUIStatus } from 'store/actions/conversations';
import { refinedConversationSelector } from 'store/selectors/conversations';

import NewMessage from './NewMessage';
import ChatHistory from './ChatHistory';
import ChatContent from './ChatContent';

const Wrapper = styled.div`
  position: fixed;
  height: calc(100vh - 68px) !important;
  width: 350px;
  background-color: #01556d;
  transition: right 1s;
  z-index: 10;
  &.show {
    right: 0px;
  }
  &.hide {
    right: -350px;
  }
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

class MessageBar extends React.Component {
  componentDidMount() {
    const { GetNetworks } = this.props;
    GetNetworks({ params: { page: 1, per_page: 1000 } });
    this.loadConversations();
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  loadConversations = () => {
    const { GetConversations } = this.props;
    GetConversations({ params: { page: 1, per_page: 1000 } });
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  onNew = () => {
    this.props.SetMessageBarUIStatus({newMessage: true});
  }

  onCancelNew = () => {
    this.props.SetMessageBarUIStatus({newMessage: false});
  }

  onSelect = id => () => {
    this.props.GetConversation({ conversationId: id });
    this.props.SetMessageBarUIStatus({ selected: id, newMessage: false });
  }

  onDelete = id => (event) => {
    event.stopPropagation();
    this.props.SetMessageBarUIStatus({ selected: -1, newMessage: false });
    this.props.DeleteConversation({
      conversationId: id,
      success: () => {
        this.loadConversations();
      }
    });
  }

  onBack = () => {
    const { GetNetworks } = this.props;
    this.props.SetMessageBarUIStatus({ selected: -1, newMessage: false });
    GetNetworks({ params: { page: 1, per_page: 1000 } });
    this.loadConversations();
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.SetMessageBarUIStatus({opened: false});
    }
  }

  render() {
    const { show, conversations, selected, newMessage } = this.props;
    return (
      <Wrapper ref={this.setWrapperRef} className={show ? 'show' : 'hide'}>
        { newMessage &&
          <NewMessage
            onCancel={this.onCancelNew}
            onCreationSuccess={this.onSelect}
          />
        }
        {selected === -1 && !newMessage && 
          <ChatHistory
            onNew={this.onNew}
            onSelect={this.onSelect}
            onDelete={this.onDelete}
            conversations={conversations}
          />
        }
        {selected !== -1 && !newMessage &&
          <ChatContent
            conversationId={selected}
            onBack={this.onBack}
          />
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  ...refinedConversationSelector(state),
  selected: get(state, 'conversation.ui.selected', -1),
  newMessage: get(state, 'conversation.ui.newMessage', false),
})

const mapDispatchToProps = {
  GetNetworks,
  GetConversations,
  GetConversation,
  DeleteConversation,
  SetMessageBarUIStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
