import React from 'react';
import styled from 'styled-components';

import LabelInput from './LabelInput';

const Wrapper = styled.div`
  width: 203px;
  height: 107px;
  border-radius: 16px;
  border: solid 1px #bebebe;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 30px;
`;

const Header = styled.div`
  height: 23px;
  background-color: #bebebe;
  padding-left: 16px;
  padding-right: 16px;
`;

export default class TextAreaInput extends React.Component {
  render() {
    const { label, onChange } = this.props;
    return (
      <Wrapper>
        <Header>
          <LabelInput value={label} onChange={onChange} />
        </Header>
      </Wrapper>
    )
  }
}