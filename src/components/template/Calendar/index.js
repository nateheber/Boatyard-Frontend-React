import React from 'react';
import styled from 'styled-components';

import LeftPart from './LeftPart';
import RightPart from './RightPart';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
`;

export default class Calendar extends React.Component {
  state = {
    listType: 'calendar'
  };
  render() {
    const { listType } = this.state;
    return (
      <Wrapper>
        <LeftPart
          onChange={listType => {
            this.setState({ listType });
          }}
        />
        <RightPart type={listType} />
      </Wrapper>
    );
  }
}
