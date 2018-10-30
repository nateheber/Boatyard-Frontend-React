import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const Section = styled.div`
  height: calc(100vh - 68px);
  overflow: auto;
  border-right: 1px solid #e6e6e6;
  &.left {
    flex: 1;
  }
  &.right {
    flex: 2;
  }
`;

export default class MessageBasicTemplate extends React.Component {
  render() {
    const { showContent, left, right } = this.props;
    return (
      <Wrapper>
        <Section className="left">{left}</Section>
        <Section className="right">{right}</Section>
      </Wrapper>
    );
  }
}
