import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Section = styled.div`
  height: calc(100vh - 68px);
  overflow: auto;
  border-right: 1px solid #e6e6e6;
  &.left {
    flex-grow: 1;
  }
  &.right {
    flex-grow: 2;
  }
`;

export default class MessageBasicTemplate extends React.Component {
  render() {
    const { showContent } = this.props;
    return (
      <Wrapper>
        <Section className="left" />
        <Section className="right" />
      </Wrapper>
    );
  }
}
