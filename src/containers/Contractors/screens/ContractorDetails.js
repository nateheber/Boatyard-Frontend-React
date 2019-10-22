import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
// import deepEqual from 'fast-deep-equal';

import { actionTypes, GetContractor, CreateContractor, UpdateContractor, DeleteContractor } from 'store/actions/contractors';
import { InputRow, InputWrapper, Input } from 'components/basic/Input';
import { Section } from 'components/basic/InfoSection';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText, PageTitle } from 'components/basic/Typho'
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';
import { TeamDetailsHeader } from '../../Teams/components';
import { validateEmail/*, formatPhoneNumber */ } from 'utils/basic';
const Wrapper = styled.div`
`;

const ContentWrapper = styled.div`
  // background-color: white;
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

class ContractorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      contractorId: null,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      company: '',
      errorMessage: {
        firstName: '',
        lastName: '',
        company: '',
        phoneNumber: '',
        email: ''
      },
      selectedLocations: [],
      visibleOfConfirmationModal: false
    };
  }

  componentDidMount() {
    const { id: contractorId } = queryString.parse(this.props.location.search);
    if (contractorId) {
      this.setState({ contractorId }, () => {
        this.loadContractor();
      })
    }
  }

  loadContractor() {
    const { GetContractor } = this.props;
    const { contractorId } = this.state;
    GetContractor({
      contractorId,
      success: () => {
        const { contractor: { company, user: { attributes: {firstName, lastName, phoneNumber, email}} } } = this.props;
        this.setState({
          firstName,
          lastName,
          company,
          phoneNumber,
          email
        });
      }
    });
  }

  isValidForm = () => {
    const { firstName, lastName, phoneNumber, email } = this.state;
    let hasError = false;
    let errorMessage = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      company: ''
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

  onChangeCompany = evt => {
    this.setState({
      company: evt.target.value
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
    this.props.history.push(`/team/contractors/list`);
  }

  onSave = () => {
    const { contractorId } = this.state;
    console.log('----------contractorId-------', contractorId);
    const { CreateContractor, UpdateContractor } = this.props;
    if (this.isValidForm()) {
      const { firstName, lastName, company, email, phoneNumber } = this.state;
      const data = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company: company.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim(),
      };
      this.setState({ saving: true });
      if (contractorId) {
        UpdateContractor({
          contractorId,
          data: {
            provider_location_directory: data
          },
          success: () => {
            this.setState({ saving: false });
            toastr.success('Success', 'Saved successfully!');
            this.onBack();
          },
          error: (e) => {
            this.setState({ saving: false });
            toastr.error('Error', e.message);
          }
        });
      } else {
        CreateContractor({
          data: {
            provider_location_directory: data
          },
          success: () => {
            this.setState({ saving: false });
            toastr.success('Success', 'Created successfully!');
            this.onBack();
          },
          error: (e) => {
            this.setState({ saving: false });
            toastr.error('Error', e.message);
          }
        });
      }
    }
  };

  deleteContractor = () => {
    const { DeleteContractor } = this.props;
    const { contractorId } = this.state;
    DeleteContractor({
      contractorId,
      success: () => {
        this.onBack();
      }
    });
  };

  render() {
    const {
      saving,
      contractorId,
      firstName,
      lastName,
      phoneNumber,
      email,
      company,
      errorMessage,
      visibleOfConfirmationModal
    } = this.state;
    const { currentStatus } = this.props;
    const loading = currentStatus === actionTypes.GET_CONTRACTOR;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.onBack} style={{ marginRight: 30 }}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave} style={{ minWidth: 100 }}>Save</OrangeButton>
      </React.Fragment>
    );
    const modalActions = [
      <HollowButton onClick={this.hideConfirmationModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteContractor} key="modal_btn_save">Confirm</OrangeButton>
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
            <Label>Company</Label>
            <Input
              type="text"
              value={company}
              onChange={this.onChangeCompany}
              hasError={errorMessage['company'].length >= 0}
              errorMessage={errorMessage['company']}
            />
          </InputFieldWrapper>
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
        </InputRow>
        <InputRow>
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
          <InputFieldWrapper />
        </InputRow>
      </React.Fragment>
    );
    return (
      <Wrapper>
        {!loading && <React.Fragment>
          <HeaderWrapper>
            {contractorId && <TeamDetailsHeader title={`${firstName} ${lastName}`} onAction={this.showConfirmationModal} />}
            {!contractorId && <PageTitle style={{ padding: '25px 30px' }}>Add New Contractor</PageTitle>}
          </HeaderWrapper>
          <ContentWrapper>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Section title='Contact' headerStyle={{ padding: 25 }}>
                  <EditorSection containerStype={{ padding: '30px 15px' }} actions={actions} content={editSection} />
                </Section>
              </Col>
            </Row>
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
        {((contractorId && loading) || saving) && <LoadingSpinner
          loading={loading || saving}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentStatus: state.contractor.currentStatus,
  contractor: state.contractor.currentContractor
});

const mapDispatchToProps = {
  GetContractor,
  CreateContractor,
  UpdateContractor,
  DeleteContractor
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDetails);
