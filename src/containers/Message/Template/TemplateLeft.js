import React from 'react';
import styled from 'styled-components';

import { TemplatesHeader } from '../components/MessageHeader';
import { TemplateSelector } from '../components';

const Wrapper = styled.div``;

export default class QRLeft extends React.Component {
  render() {
    const { onSelect } = this.props;
    return (
      <Wrapper>
        <TemplatesHeader />
        <TemplateSelector onSelect={onSelect} />
      </Wrapper>
    );
  }
}
