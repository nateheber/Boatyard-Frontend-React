import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
  border-radius: 10px;
  border: solid 1px #bebebe;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 10px;
`;

const LeftPart = styled.div`
  display: flex;
  justify-content: center;
  width: 61px;
  background-color: #bebebe;
  padding: 4px;
  padding-right: 7px;
`;

const RightPart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px;
`;

const LabelInput = styled.div`
  width: 50px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: transparent;
  font-size: 7.2px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  resize: none;
  border: none;
  outline: none;
  &:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
  text-align: right;
  text-transform: uppercase;
  color: white;
  width: 100%;
`;

export default class TextInput extends React.Component {
  render() {
    const { label, onChange } = this.props;
    return (
      <Wrapper>
        <LeftPart>
          <LabelInput disabled onChange={onChange}>
            {label}
          </LabelInput>
        </LeftPart>
        <RightPart>
        </RightPart>
      </Wrapper>
    )
  }
}