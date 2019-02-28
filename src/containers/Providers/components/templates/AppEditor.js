import React from 'react';
import styled from 'styled-components';

import AppHeader from '../basic/AppHeader';
import StepSelector from '../compound/StepSelector';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100% - 20px);
  margin-top: 20px;
  background-color: white;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background: white;
  height: 100%;
`;

const Left = styled.div`
  width: 306px;
  border-right: 1px solid #E6E6E6;
  height: 100%;
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: scroll;
`

export default class AppEditor extends React.Component {
  state = {
    step: 0,
  }

  onChangeStep = (step) => {
    this.setState({ step });
  }

  render() {
    const { step } = this.state;
    return (
      <Wrapper>
        <AppHeader />
        <Content>
          <Left>
            <StepSelector
              curStep={step}
              onChange={this.onChangeStep}
            />
          </Left>
          <Right></Right>
        </Content>
      </Wrapper>
    )
  }
}