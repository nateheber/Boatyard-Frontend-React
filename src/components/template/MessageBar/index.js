import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetNetworks } from 'store/actions/networks';
import { refinedNetworkSelector } from 'store/selectors/network';

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

const items = [
  {
    id: 1,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 0,
    dateTime: new Date('2018/10/1')
  },
  {
    id: 2,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 1,
    dateTime: new Date('2018/10/2')
  },
  {
    id: 3,
    subject: 'test',
    sender: 'Test Sender',
    textBody: 'test',
    unread: 0,
    dateTime: new Date('2018/10/21')
  }
];

class MessageBar extends React.Component {
  state = {
    selected: -1,
    newMessage: false,
  };

  componentDidMount() {
    this.props.GetNetworks({ page: 1 });
  }

  onNew = () => {
    this.setState({ newMessage: true });
  }

  onCancelNew = () => {
    this.setState({ newMessage: false });
  }

  onSelect = id => () => {
    this.setState({ selected: id });
  }

  onBack = () => {
    this.setState({ selected: -1, newMessage: false });
  }

  render() {
    const { show, networks } = this.props;
    const { selected, newMessage } = this.state;
    return (
      <Wrapper className={show ? 'show' : 'hide'}>
        { newMessage &&
          <NewMessage onCancel={this.onCancelNew} />
        }
        {selected === -1 && !newMessage && 
          <ChatHistory
            onNew={this.onNew}
            onSelect={this.onSelect}
            networks={networks}
          />
        }
        {selected !== -1 && !newMessage &&
          <ChatContent
            onBack={this.onBack}
          />
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...refinedNetworkSelector(state)
})

const mapDispatchToProps = {
  GetNetworks
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
