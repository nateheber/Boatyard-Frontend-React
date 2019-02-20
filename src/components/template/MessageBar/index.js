import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  position: absolute;
  height: calc(100vh - 68px) !important;
  width: 350px;
  background-color: #01556d;
  transition: right 1s;
  &.show {
    right: 0px;
  }
  &.hide {
    right: -350px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-bottom: solid 1px #e6e6e6;
`;

export default class MessageBar extends React.Component {
  render() {
    const { show } = this.props;
    return (
      <Wrapper className={show ? 'show' : 'hide'}>
        <InputWrapper>
          <SearchBox style={{ width: '100%', marginBottom: '15px' }} />
          <OrangeButton  style={{ width: '100%' }} >Compose</OrangeButton>
        </InputWrapper>
      </Wrapper>
    )
  }
}