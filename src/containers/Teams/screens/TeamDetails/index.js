import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes, GetManagement, CreateManagement, UpdateManagement, DeleteManagement } from 'store/actions/managements';
import { InputRow, InputWrapper, Input, Select } from 'components/basic/Input';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText, PageTitle } from 'components/basic/Typho'
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';
import { TeamDetailsHeader } from '../../components';
import { validateEmail, formatPhoneNumber } from 'utils/basic';

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

class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managementId: null,
      management: {},
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      access: 'admin',
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
    const managementId = query.id;
    if (managementId) {
      this.getManagement(managementId);
    }
  }

  getManagement = (managementId) => {
    this.setState({ managementId }, () => {
      this.props.GetManagement({ managementId,
        success: (management) => {
          const firstName = get(management, 'relationships.user.attributes.firstName') || '';
          const lastName = get(management, 'relationships.user.attributes.lastName') || '';
          const phoneNumber = get(management, 'relationships.user.attributes.phoneNumber') || '';
          const email = get(management, 'relationships.user.attributes.email') || '';
          const access = get(management, 'attributes.access') || 'admin';
          this.setState({ management, firstName, lastName, phoneNumber: formatPhoneNumber(phoneNumber), email, access });
        },
        error: () => {
          toastr.error('Error', 'Member does not exist!');
          this.onBack();
        } 
      });
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
    if (firstName.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        firstName: 'First Name is Required'
      };
      hasError = hasError || true;
    }
    if (lastName.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        lastName: 'Last Name is Required'
      };
      hasError = hasError || true;
    }
    if (phoneNumber.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        phoneNumber: 'Phone Number is Required'
      };
      hasError = hasError || true;
    }
    if (email.trim().length <= 0) {
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
    const access = evt.target.value;
    this.setState({ access });
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

  onBack = () => {
    this.props.history.push(`/team`);
  }

  onSave = () => {
    const { managementId, access } = this.state;
    const { CreateManagement, UpdateManagement } = this.props;
    if (this.isValidForm()) {
      const { firstName, lastName, email, phoneNumber } = this.state;
      const data = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim(),
        access
      };
      if (managementId) {
        UpdateManagement({
          managementId,
          data: {
            management: data
          },
          success: () => {
            toastr.success('Success', 'Saved successfully!');
            this.onBack();
          },
          error: (e) => {
            toastr.error('Error', e.message);
          }
        });
      } else {
        if (this.props.privilege === 'admin') {
          data['provider_id'] = '1';
        }
        CreateManagement({
          data: {
            management: data
          },
          success: () => {
            toastr.success('Success', 'Created successfully!');
            this.onBack();
          },
          error: (e) => {
            toastr.error('Error', e.message);
          }
        });
      }
    }
  };

  deleteTeamMember = () => {
    const { DeleteManagement } = this.props;
    const { managementId } = this.state;
    DeleteManagement({
      managementId,
      success: () => {
        this.onBack();
      }
    });
  };

  render() {
    const {
      managementId,
      firstName,
      lastName,
      phoneNumber,
      email,
      access,
      errorMessage,
      visibleOfConfirmationModal
    } = this.state;
    const { currentStatus } = this.props;
    const loading = currentStatus === actionTypes.GET_MANAGEMENT;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.onBack} style={{ marginRight: 30 }}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave} style={{ minWidth: 100 }}>Save</OrangeButton>
      </React.Fragment>
    );
    const modalActions = [
      <HollowButton onClick={this.hideConfirmationModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteTeamMember} key="modal_btn_save">Confirm</OrangeButton>
    ];
    const editSection = (
      <React.Fragment>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>First Name</Label>
            <Input
              type="text"
              value={firstName}
              onChange={this.onChangeFN}
              hasError={errorMessage['firstName'].length >= 0}
              errorMessage={errorMessage['firstName']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Last Name</Label>
            <Input
              type="text"
              value={lastName}
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
              value={email}
              onChange={this.onChangeEmail}
              hasError={errorMessage['email'].length >= 0}
              errorMessage={errorMessage['email']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Phone</Label>
            <Input
              type="text"
              value={phoneNumber}
              onChange={this.onChangePN}
              mask='(999) 999-9999'
              hasError={errorMessage['phoneNumber'].length >= 0}
              errorMessage={errorMessage['phoneNumber']}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Permissions</Label>
            <Select
              value={access}
              onChange={this.handlePermissionChange}
            >
              <React.Fragment>
                <option value="admin">Admin</option>
              </React.Fragment>
            </Select>
          </InputFieldWrapper>
          <InputFieldWrapper />
        </InputRow>
      </React.Fragment>
    );
    return (
      <Wrapper>
        {managementId ? <React.Fragment>
          {!loading && <React.Fragment>
            <HeaderWrapper>
              <TeamDetailsHeader title={`${firstName} ${lastName}`} onAction={this.showConfirmationModal} />
            </HeaderWrapper>
            <ContentWrapper>
              <EditorSection actions={actions} content={editSection} />
            </ContentWrapper>
          </React.Fragment>}
        </React.Fragment>
        : <React.Fragment>
            <HeaderWrapper>
            <PageTitle style={{ padding: '25px 30px' }}>Add New Member</PageTitle>
            </HeaderWrapper>
            <ContentWrapper>
              <EditorSection actions={actions} content={editSection} />
            </ContentWrapper>          
        </React.Fragment>}
        <Modal
          title={'Are You Sure?'}
          actions={modalActions}
          normal={true}
          open={visibleOfConfirmationModal}
          onClose={this.hideConfirmationModal}
        >
          <Description>Deleting {`${firstName} ${lastName}`}&#39;s account is permanent and cannot be undone.</Description>
        </Modal>
        {(managementId && loading) && <LoadingSpinner
          loading={loading}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.management.currentStatus,
  privilege: state.auth.privilege
});

const mapDispatchToProps = {
  GetManagement,
  CreateManagement,
  UpdateManagement,
  DeleteManagement
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
