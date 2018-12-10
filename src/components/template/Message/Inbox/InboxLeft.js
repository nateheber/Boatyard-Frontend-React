import React from 'react';
import styled from 'styled-components';

import { InboxHeader } from 'components/compound/MessageHeader';
import { InboxSelector } from 'components/compound/MessageComponents';

const Wrapper = styled.div``;

export default class InboxLeft extends React.Component {
  state = {
    selected: []
  };
  render() {
    const { items, onShowItem, onDeleteItem, onCompose } = this.props;
    const { selected } = this.state;
    const totalCount = items.length;
    return (
      <Wrapper>
        <InboxHeader
          selected={selected.length}
          total={totalCount}
          onCompose={onCompose}
        />
        <InboxSelector
          items={items}
          onChangeSelection={selected => {
            this.setState({
              selected
            });
          }}
          onSelect={onShowItem}
          onDelete={onDeleteItem}
        />
      </Wrapper>
    );
  }
}
