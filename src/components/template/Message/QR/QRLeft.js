import React from 'react';
import styled from 'styled-components';

import { QRHeader } from '../../../compound/MessageHeader';
import { QRSelector } from '../../../compound/MessageComponents';

const Wrapper = styled.div``;

export default class QRLeft extends React.Component {
  state = {
    selected: []
  };
  render() {
    const { items, onAdd, onSelect, onShowItem, onDeleteItems } = this.props;
    return (
      <Wrapper>
        <QRHeader onAdd={onAdd} />
        <QRSelector
          items={items}
          onChangeSelection={selected => {
            this.setState(
              {
                selected
              },
              () => {
                onSelect(selected);
              }
            );
          }}
          onSelect={onShowItem}
          onDelete={onDeleteItems}
        />
      </Wrapper>
    );
  }
}
