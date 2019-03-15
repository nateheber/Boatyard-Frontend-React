import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

import '../style.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
  border-radius: 10px;
  border: solid 1px #bebebe;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 30px;
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
`;

const Label = styled.span`
  font-family: DIN;
  font-size: 7.2px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #094359;
  margin-left: 6px;
`

export default class SwitchInput extends React.Component {
  state = {
    checked: false,
  }
  onChange = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
    if (this.props.onToggle) {
      this.props.onToggle(!checked);
    }
  }
  render() {
    const { label, disabled } = this.props;
    const { checked } = this.state;
    return (
      <Wrapper>
        <LeftPart>
          <LabelInput>
            {label}
          </LabelInput>
        </LeftPart>
        <RightPart>
          <Switch
            checked={checked}
            handleDiameter={16}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={14}
            width={36}
            className="react-switch"
            id="material-switch"
            onChange={this.onChange}
            disabled={disabled}
          />
          <Label>NO</Label>
        </RightPart>
      </Wrapper>
    )
  }
}
