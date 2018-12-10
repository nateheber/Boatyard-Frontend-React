import React from 'react';
import styled from 'styled-components';

import { MessageItem, TemplateItem } from 'components/basic/Message';

const Wrapper = styled.div``;

export class TemplateSelector extends React.Component {
  state = {
    selected: ''
  };
  render() {
    const { provider, onSelect } = this.props;
    const { selected } = this.state;
    return (
      <Wrapper>
        <MessageItem
          onClick={() => {
            this.setState({ selected: 'quote' });
            onSelect('quote');
          }}
          className={selected === 'quote' ? 'active' : 'detactive'}
        >
          <TemplateItem
            type="Quote"
            description={`Your Quote from ${provider}`}
          />
        </MessageItem>
        <MessageItem
          onClick={() => {
            this.setState({ selected: 'invoice' });
            onSelect('invoice');
          }}
          className={selected === 'invoice' ? 'active' : 'detactive'}
        >
          <TemplateItem
            type="Invoice"
            description={`Your Invoice from ${provider}`}
          />
        </MessageItem>
      </Wrapper>
    );
  }
}
