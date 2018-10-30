import React from 'react';
import styled from 'styled-components';

import { TemplatesHeader } from '../../../compound/MessageHeader';
import { TemplateSelector } from '../../../compound/MessageComponents';

const Wrapper = styled.div``;

export default class QRLeft extends React.Component {
  render() {
    const { provider, onSelect } = this.props;
    return (
      <Wrapper>
        <TemplatesHeader />
        <TemplateSelector provider={provider} onSelect={onSelect} />
      </Wrapper>
    );
  }
}
