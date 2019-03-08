import React from 'react';
import styled from 'styled-components';

import LabelInput from '../LabelInput';

const Wrapper = styled.div`
  width: 203px;
  height: 107px;
  border-radius: 10px;
  border: solid 1px #bebebe;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 30px;
`;

const Header = styled.div`
  height: 23px;
  display: flex;
  align-items: center;
  background-color: #bebebe;
  padding: 0 10px;
  font-family: Helvetica;
  font-size: 12px;
`;

export default class TextAreaInput extends React.Component {
  render() {
    const { label, onChange, disabled } = this.props;
    return (
      <Wrapper>
        <Header>
          <LabelInput disabled={disabled} value={label} onChange={onChange} />
        </Header>
      </Wrapper>
    )
  }
}