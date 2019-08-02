import React from 'react';
import styled from 'styled-components';

import { QRHeader } from '../components/MessageHeader';
import { QRSelector } from '../components';

const Wrapper = styled.div``;

export default class QRLeft extends React.Component {
  state = {
    selected: []
  };

  onSelect = selected => {
    this.setState(
      { selected },
      () => { this.props.onSelect(selected); }
    );
  }


  render() {
    const { items, onAdd, onShowItem, onDeleteItems } = this.props;
    return (
      <Wrapper>
        <QRHeader onAdd={onAdd} />
        <QRSelector
          items={items}
          onChangeSelection={this.onSelect}
          onSelect={onShowItem}
          onDelete={onDeleteItems}
        />
      </Wrapper>
    );
  }
}
