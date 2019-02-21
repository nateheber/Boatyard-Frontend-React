import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { OrangeButton } from 'components/basic/Buttons';

import ChatTrigger from './ChatTrigger';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-bottom: solid 1px #e6e6e6;
`;

export default class ChatHistory extends React.Component {
  state = {
    selected: -1,
    newMessage: false,
  };

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
    const { items, onSelect, onNew } = this.props;
    return (
      <React.Fragment>
        <SearchWrapper>
          <SearchBox style={{ width: '100%', marginBottom: '15px' }} />
          <OrangeButton  style={{ width: '100%' }} onClick={onNew} >Compose</OrangeButton>
        </SearchWrapper>
        {
          items.map((item, idx) => (
            <ChatTrigger item={item} onClick={onSelect} key={`item_${idx}`} />
          ))
        }
      </React.Fragment>
    )
  }
}