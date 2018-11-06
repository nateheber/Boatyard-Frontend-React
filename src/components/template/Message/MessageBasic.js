import React from 'react';
import styled from 'styled-components';
import className from 'classnames';

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
  @media (max-width: 992px) {
    &.left {
      display: none;
    }
    &.left.show {
      display: block;
    }
    &.right {
      display: none;
    }
    &.right.show {
      display: block;
    }
  }
`;

export default class MessageBasicTemplate extends React.Component {
  render() {
    const { showContent, left, right } = this.props;
    const leftClassName = className('left', { show: !showContent });
    const rightClassName = className('right', { show: showContent });
    return (
      <Wrapper>
        <Section className={leftClassName}>{left}</Section>
        <Section className={rightClassName}>{right}</Section>
      </Wrapper>
    );
  }
}
