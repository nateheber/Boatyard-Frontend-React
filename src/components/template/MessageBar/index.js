import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetNetworks } from 'store/actions/networks';
import { GetConversations, GetConversation } from 'store/actions/conversations';
import { refinedConversationSelector } from 'store/selectors/conversations';

import NewMessage from './NewMessage';
import ChatHistory from './ChatHistory';
import ChatContent from './ChatContent';

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

class MessageBar extends React.Component {
  state = {
    selected: -1,
    newMessage: false,
  };

  componentDidMount() {
    this.props.GetNetworks({ page: 1 });
    this.props.GetConversations({ page: 1 });
  }

  onNew = () => {
    this.setState({ newMessage: true });
  }

  onCancelNew = () => {
    this.setState({ newMessage: false });
  }

  onSelect = id => () => {
    this.props.GetConversation({ conversationId: id });
    this.setState({ selected: id });
  }

  onBack = () => {
    this.setState({ selected: -1, newMessage: false });
  }

  render() {
    const { show, conversations } = this.props;
    const { selected, newMessage } = this.state;
    return (
      <Wrapper className={show ? 'show' : 'hide'}>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
