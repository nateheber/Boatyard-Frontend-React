import React from 'react';
import { connect } from 'react-redux';

import { GetNetworks } from 'store/actions/networks';
import { refinedNetworkSelector } from 'store/selectors/network';

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
    this.props.GetNetworks({ page: 1 });
  }
  render() {
    const { showContent, showing, createNew } = this.state;
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
    const chatHistory = {
      opponent: 'Brock Prod Test 9',
      opponentType: 'test',
      history: [
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body:
            'test test test test test test test stest teste set set set set',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: false
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body:
            'test test test test test test test stest teste set set set set',
          own: false
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: false
        },
        { name: 'Daniel', time: '2018/10/21 23:20:10', body: 'test', own: true }
      ]
    };
    console.log(this.props);
    return (
      <MessageBasic
        left={
          <InboxLeft
            items={items}
            onCompose={() => {
              this.setState({
                createNew: true
              });
            }}
            onShowItem={id => {
              this.setState({
                createNew: false,
                showContent: true,
                showing: id
              });
            }}
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
            data={chatHistory}
            empty={!(showing >= 0)}
            onBack={() => {
              this.setState({
                showContent: false
              });
            }}
          />
        }
        showContent={showContent}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ...refinedNetworkSelector(state),
})

const mapDispatchToProps = {
  GetNetworks
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);