import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { OrangeButton } from 'components/basic/Buttons';

import Conversation from './Conversation';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-bottom: solid 1px #e6e6e6;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const ConversationListWrapper = styled.div`
`;

export default class ChatHistory extends React.Component {

  render() {
    const { conversations, onSelect, onNew, onDelete } = this.props;
    return (
      <Wrapper>
        <SearchWrapper>
          <SearchBox style={{ marginBottom: '15px', width: '100%' }} />
          <OrangeButton  style={{ width: '100%' }} onClick={onNew} >Compose</OrangeButton>
        </SearchWrapper>
        <ConversationListWrapper>
          {
            conversations.map((conversation, idx) => (
              <Conversation conversation={conversation} onClick={onSelect} onDelete={onDelete} key={`item_${idx}`} />
            ))
          }
        </ConversationListWrapper>
      </Wrapper>
    )
  }
}
