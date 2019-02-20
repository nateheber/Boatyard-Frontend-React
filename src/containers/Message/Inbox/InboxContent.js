import React from 'react';
import styled from 'styled-components';

import { MessageEmptyState } from 'components/basic/Message';
import {
  MessageBox,
  ChatBox,
  NewMessageInfo
} from '../components';
import { InboxContentHeader } from '../components/MessageHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default class InboxContent extends React.Component {
  render() {
    const { data, empty, onBack, createNew } = this.props;
    const toOptions = [
      {
        value: 0,
        label: 'Brock Prod Test 9 Donnelly',
        description: 'brock+pt9@boatyard.com'
      },
      {
        value: 0,
        label: 'Brock Prod Test 8 Donnelly',
        description: 'brock+pt8@boatyard.com'
      },
      {
        value: 1,
        label: 'Daniel Zheng',
        description: 'dannyzheng1993@gmail.com'
      },
      {
        value: 2,
        label: 'Detailer Brock Boatyard',
        description: 'brock+180_unlimited@boatyard.com'
      }
    ];
    return createNew ? (
      <Wrapper>
        <InboxContentHeader onBack={onBack} name="New Message" />
        <NewMessageInfo options={toOptions} />
        <ChatBox />
      </Wrapper>
    ) : empty ? (
      <Wrapper>
        <MessageEmptyState text="No Message Selected" />
      </Wrapper>
    ) : (
      <Wrapper>
        <InboxContentHeader
          onBack={onBack}
          name={data.opponent}
          description={data.opponentType}
        />
        <MessageBox chatHistory={data.history} />
        <ChatBox />
      </Wrapper>
    );
  }
}
