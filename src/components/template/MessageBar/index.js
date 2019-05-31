import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetNetworks } from 'store/actions/networks';
import { GetConversations, GetConversation, DeleteConversation } from 'store/actions/conversations';
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
  state = {
    selected: -1,
    newMessage: false
  };

  componentDidMount() {
    this.props.GetNetworks({ page: 1, per_page: 1000 });
    this.props.GetConversations({ page: 1, per_page: 1000 });
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  onNew = () => {
    this.setState({ newMessage: true });
  }

  onCancelNew = () => {
    this.setState({ newMessage: false });
  }

  onSelect = id => () => {
    this.props.GetConversation({ conversationId: id });
    this.setState({ selected: id, newMessage: false });
  }

  onDelete = id => (event) => {
    event.stopPropagation();
    this.setState({ selected: -1, newMessage: false });
    this.props.DeleteConversation({
      conversationId: id,
      success: () => {
        this.props.GetConversations({ page: 1, per_page: 1000 });
      }
    });
  }

  onBack = () => {
    this.setState({ selected: -1, newMessage: false });
    this.props.GetNetworks({ page: 1, per_page: 1000 });
    this.props.GetConversations({ page: 1, per_page: 1000 });
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onHide(event);
    }
  }

  render() {
    const { show, conversations } = this.props;
    const { selected, newMessage } = this.state;
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

const mapStateToProps = state => ({
  ...refinedConversationSelector(state),
})

const mapDispatchToProps = {
  GetNetworks,
  GetConversations,
  GetConversation,
  DeleteConversation
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
