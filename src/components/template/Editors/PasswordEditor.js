import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

const Header = styled.div`
  flex: 1 0 auto;
  background-color: #fafafa;
  color: #003247;
  padding: 25px;
  height: 75px;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Source Sans', sans-serif;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 28px;
`;

export class PasswordEditor extends React.Component {
  state = {
    password: '',
    confirmPassword: ''
  };
  onChangePassword = evt => {
    this.setState({
      password: evt.target.value
    });
  };
  onChangeConfirmPassword = evt => {
    this.setState({
      confirmPassword: evt.target.value
    });
  };
  onUpdate = () => {
    const { password, confirmPassword } = this.state;
    if (!isEmpty(password) && password === confirmPassword) {
      this.props.onSave(password);
    }
  };
  render() {
    const { password, confirmPassword } = this.state;
    const fields = (
      <div style={{ paddingTop: '30px' }}>
        <Header>Change Password</Header>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>New Password</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Confirm Password</InputLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.props.onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={this.onUpdate}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
