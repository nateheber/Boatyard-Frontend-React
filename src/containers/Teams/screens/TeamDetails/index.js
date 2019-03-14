import React from 'react';
import styled from 'styled-components';

import {
  InputRow,
  InputWrapper,
  Input,
  Select
} from 'components/basic/Input';
import { NormalText } from 'components/basic/Typho'
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';
import { TeamDetailsHeader } from '../../components';

const Wrapper = styled.div`
`;

const ContentWrapper = styled.div`
  background-color: white;
  margin: 30px 25px;
`;

const HeaderWrapper = styled.div`
  background-color: white;
`;

const InputFieldWrapper = styled(InputWrapper)`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-family: Helvetica;
  font-size: 14px;
  color: #003247;
  text-align: left;
  margin-bottom: 20px;
`;

export const Description = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

// const PermissionText = styled.div`
//   font-family: 'Source Sans Pro', sans-serif;
//   font-size: 14px;
//   color: #333;
//   text-transform: capitalize;
// `;

export default class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      permissions: '',
      visibleOfConfirmationModal: false
    };
  }

  onSave = () => {
    const { id } = this.props.profile;
    this.props.updateProfile({ id, data: this.state });
  };

  handlePermissionChange = (evt) => {
    const permissions = evt.target.value;
    this.setState({ permissions });
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

  showConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: true
    });
  };

  hideConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: false
    });
  };

  onSave = () => {
  };

  deleteTeam = () => {
  };

  render() {
    const { firstName, lastName, phoneNumber, email, permissions, visibleOfConfirmationModal } = this.state;
    const { history } = this.props;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={() => history.goBack()} style={{ marginRight: 30 }}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave} style={{ minWidth: 100 }}>Save</OrangeButton>
      </React.Fragment>
    );
    const modalActions = [
      <HollowButton onClick={this.hideConfirmationModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteTeam} key="modal_btn_save">Confirm</OrangeButton>
    ];
    const editSection = (
      <React.Fragment>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>First Name</Label>
            <Input
              type="text"
              defaultValue={firstName}
              onChange={this.onChangeFN}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Last Name</Label>
            <Input
              type="text"
              defaultValue={lastName}
              onChange={this.onChangeLN}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Email</Label>
            <Input
              type="text"
              defaultValue={email}
              onChange={this.onChangeEmail}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Phone</Label>
            <Input
              type="text"
              defaultValue={phoneNumber}
              onChange={this.onChangePN}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Permissions</Label>
            {/* <PermissionText>{permissions}</PermissionText> */}
            <Select
              value={permissions}
              onChange={this.handlePermissionChange}
            >
              <React.Fragment>
                <option value="Admin">Admin</option>
              </React.Fragment>
            </Select>
          </InputFieldWrapper>
          <InputFieldWrapper />
        </InputRow>
      </React.Fragment>
    );
    return (
      <Wrapper>
        <HeaderWrapper>
          <TeamDetailsHeader title={'Brock Donnelly'} onAction={this.showConfirmationModal} />
        </HeaderWrapper>
        <ContentWrapper>
          <EditorSection actions={actions} content={editSection} />
        </ContentWrapper>
        <Modal
          title={'Are You Sure?'}
          actions={modalActions}
          normal={true}
          open={visibleOfConfirmationModal}
          onClose={this.hideConfirmationModal}
        >
          <Description>Deleting {'Brock Donnelly'}&#39;s account is permanent and cannot be undone.</Description>
        </Modal>
      </Wrapper>
    );
  }
}
