import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import { InputRow, InputWrapper, Input, Select } from 'components/basic/Input';
import { NormalText } from 'components/basic/Typho'
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';
import { TeamDetailsHeader } from '../../components';
import { validateEmail } from 'utils/basic';

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
      memberId: -1,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      permissions: '',
      errorMessage: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      visibleOfConfirmationModal: false
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const memberId = query.id;
    console.log('-----------------Member---------------', memberId);
    this.setState({ memberId }, () => {
    });
  }

  isValidForm = () => {
    const { firstName, lastName, phoneNumber, email } = this.state;
    let hasError = false;
    let errorMessage = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    };
    if (firstName.length <= 0) {
      errorMessage = {
        ...errorMessage,
        firstName: 'First Name is Required'
      };
      hasError = hasError || true;
    }
    if (lastName.length <= 0) {
      errorMessage = {
        ...errorMessage,
        lastName: 'Last Name is Required'
      };
      hasError = hasError || true;
    }
    if (phoneNumber.length <= 0) {
      errorMessage = {
        ...errorMessage,
        phoneNumber: 'Phone Number is Required'
      };
      hasError = hasError || true;
    }
    if (email.length <= 0) {
      errorMessage = {
        ...errorMessage,
        email: 'Email is Required'
      };
      hasError = hasError || true;
    } else if (!validateEmail(email)) {
      errorMessage = {
        ...errorMessage,
        email: 'Invalid Email'
      };
      hasError = hasError || true;
    }
    this.setState({ errorMessage });
    return !hasError;
  }

  handlePermissionChange = (evt) => {
    const permissions = evt.target.value;
    this.setState({ permissions });
  };

  onChangeFN = evt => {
    this.setState({
      firstName: evt.target.value.trim()
    });
  };

  onChangeLN = evt => {
    this.setState({
      lastName: evt.target.value.trim()
    });
  };

  onChangeEmail = evt => {
    this.setState({
      email: evt.target.value.trim()
    });
  };

  onChangePN = evt => {
    this.setState({
      phoneNumber: evt.target.value.trim()
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

  onBack = () => {
    this.props.history.push(`/team`);
  }

  onSave = () => {
    const { memberId } = this.state;
    if (this.isValidForm()) {
      if (memberId !== -1) {
      } else {
      }
      // this.props.updateProfile({ id, data: this.state });  
    }
  };

  deleteTeam = () => {
  };

  render() {
    const { firstName, lastName, phoneNumber, email, permissions, errorMessage, visibleOfConfirmationModal } = this.state;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.onBack} style={{ marginRight: 30 }}>Cancel</HollowButton>
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
              hasError={errorMessage['firstName'].length >= 0}
              errorMessage={errorMessage['firstName']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Last Name</Label>
            <Input
              type="text"
              defaultValue={lastName}
              onChange={this.onChangeLN}
              hasError={errorMessage['lastName'].length >= 0}
              errorMessage={errorMessage['lastName']}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={email}
              onChange={this.onChangeEmail}
              hasError={errorMessage['email'].length >= 0}
              errorMessage={errorMessage['email']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Phone</Label>
            <Input
              type="text"
              defaultValue={phoneNumber}
              onChange={this.onChangePN}
              hasError={errorMessage['phoneNumber'].length >= 0}
              errorMessage={errorMessage['phoneNumber']}
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
