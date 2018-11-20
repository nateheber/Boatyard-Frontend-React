import React from 'react';
import styled from 'styled-components';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

const Wrapper = styled.div`
  background-color: white;
  margin: 30px 25px;
`;

const Splitter = styled.div`
  height: 1px;
  background: #dfdfdf;
  margin: 20px 0px;
`;

const PermissionText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: #333;
  text-transform: capitalize;
`;

export class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, phoneNumber, email } = props.profile;
    this.state = {
      firstName,
      lastName,
      phoneNumber,
      email
    };
  }
  onSave = () => {
    const { id } = this.props.profile;
    this.props.updateProfile({ id, data: this.state });
  };
  onChangeFN = evt => {
    this.setState({
      firstName: evt.target.value
    });
  };
  onChangeLN = evt => {
    this.setState({
      lastName: evt.target.value
    });
  };
  onChangeEmail = evt => {
    this.setState({
      email: evt.target.value
    });
  };
  onChangePN = evt => {
    this.setState({
      phoneNumber: evt.target.value
    });
  };
  render() {
    const { firstName, lastName, phoneNumber, email } = this.state;
    const { history } = this.props;
    const { type } = this.props.profile;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={() => history.goBack()}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    const editSection = (
      <React.Fragment>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>First Name</InputLabel>
            <Input
              type="text"
              defaultValue={firstName}
              onChange={this.onChangeFN}
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Last Name</InputLabel>
            <Input
              type="text"
              defaultValue={lastName}
              onChange={this.onChangeLN}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              defaultValue={email}
              onChange={this.onChangeEmail}
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input
              type="text"
              defaultValue={phoneNumber}
              onChange={this.onChangePN}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Permissions</InputLabel>
            <PermissionText>{type}</PermissionText>
          </InputWrapper>
        </InputRow>
        <Splitter />
        <InputRow style={{ flex: '12' }}>
          <InputWrapper style={{ flex: '3' }} className="secondary">
            <InputLabel>Security Settings</InputLabel>
            <HollowButton>Change Password</HollowButton>
          </InputWrapper>
          {/* <InputWrapper style={{ flex: '2' }} className="secondary">
            <InputLabel>IOS App Version</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: '2' }} className="secondary">
            <InputLabel>Android App Version</InputLabel>
            <Input type="text" />
          </InputWrapper> */}
        </InputRow>
      </React.Fragment>
    );
    return (
      <Wrapper>
        <EditorSection actions={actions} content={editSection} />
      </Wrapper>
    );
  }
}
