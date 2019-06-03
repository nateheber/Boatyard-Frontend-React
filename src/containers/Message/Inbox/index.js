import React from 'react';
import { connect } from 'react-redux';

import { GetNetworks } from 'store/actions/networks';
import { GetConversations, GetConversation } from 'store/actions/conversations';
import { refinedNetworkSelector } from 'store/selectors/network';
import { refinedConversationSelector } from 'store/selectors/conversations';

import MessageBasic from '../MessageBasic';
import InboxLeft from './InboxLeft';
import InboxContent from './InboxContent';

class Inbox extends React.Component {
  state = {
    showContent: false,
    showing: -1,
    selected: [],
    createNew: false
  };

  componentDidMount() {
    const { GetNetworks, GetConversations } = this.props;
    GetNetworks({ params: { page: 1, per_page: 1000 } });
    GetConversations({ params: { page: 1, per_page: 1000 } });
  }

  onCompose = () => {
    this.setState({
      createNew: true
    });
  }

  onShowItem = id => {
    const { GetConversation } = this.props;
    GetConversation({ conversationId: id });
    this.setState({
      createNew: false,
      showContent: true,
      showing: id
    });
  }

  onBack = () => {
    this.setState({
      showContent: false
    });
  }

  render() {
    const { showContent, showing, createNew } = this.state;
    const { conversations } = this.props;
    return (
      <MessageBasic
        left={
          <InboxLeft
            items={conversations}
            onCompose={this.onCompose}
            onShowItem={this.onShowItem}
            onDeleteItem={ids => {
              this.setState({
                selected: ids
              });
            }}
          />
        }
        right={
          <InboxContent
            createNew={createNew}
            empty={!(showing >= 0)}
            conversationId={showing}
            onBack={this.onBack}
            onSelect={this.onShowItem}
          />
        }
        showContent={showContent}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ...refinedNetworkSelector(state),
  ...refinedConversationSelector(state),
})

const mapDispatchToProps = {
  GetNetworks,
  GetConversations,
  GetConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);