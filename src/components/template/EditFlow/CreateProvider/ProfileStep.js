import React from 'react';
import styled from 'styled-components';

import {
  Input,
  InputLabel,
  InputRow,
  InputWrapper
} from '../../../basic/Input';
import { HollowButton, OrangeButton } from '../../../basic/Buttons';

const Wrapper = styled.div`
  padding: 30px;
  background: #fff;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid 20px;
  padding-top: 35px;
`;

export default class ProfileSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    };
  }
  onChangeValue = (value, field) => {
    const updateState = {};
    updateState[field] = value;
    this.setState(updateState);
  };
  save = () => {
    this.props.onSave(this.state);
  };
  render() {
    return (
      <Wrapper>
        <InputRow>
          <InputWrapper className="secondary" style={{ flex: 2 }}>
            <InputLabel>Provider Name</InputLabel>
            <Input
              onChange={evt => this.onChangeValue(evt.target.value, 'name')}
            />
          </InputWrapper>
          <InputWrapper className="secondary" style={{ flex: 1 }}>
            <InputLabel>Contact First Name</InputLabel>
            <Input
              onChange={evt =>
                this.onChangeValue(evt.target.value, 'firstName')
              }
            />
          </InputWrapper>
          <InputWrapper className="secondary" style={{ flex: 1 }}>
            <InputLabel>Contact Last Name</InputLabel>
            <Input
              onChange={evt => this.onChangeValue(evt.target.value, 'lastName')}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input
              onChange={evt =>
                this.onChangeValue(evt.target.value, 'phoneNumber')
              }
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Email</InputLabel>
            <Input
              onChange={evt => this.onChangeValue(evt.target.value, 'email')}
            />
          </InputWrapper>
        </InputRow>
        <ActionWrapper>
          <HollowButton onClick={this.save}>Save</HollowButton>
        </ActionWrapper>
      </Wrapper>
    );
  }
}
