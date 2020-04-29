import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { Row, Col } from 'react-flexbox-grid';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import { GetManagement, UpdateManagement } from 'store/actions/managements';
import { UpdateProviderLocation } from 'store/actions/providerLocations';
import { UpdateProvider } from 'store/actions/providers';
import { formatPhoneNumber } from 'utils/basic';
import { Input } from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import PaymentSettings from './components/PaymentSettings';
import PasswordEditor from './components/PasswordEditor';
import LoadingSpinner from 'components/basic/LoadingSpinner';

import { updateProfile, setProfile } from 'store/reducers/profile';

const Wrapper = styled.div`
  height: 100%;
`;

const ContentWrapper = styled.div`
  background-color: white;
  margin: 30px 25px;
`;

const Splitter = styled.div`
  height: 1px;
  background: #dfdfdf;
  margin: 20px 0px;
`;

const InputLabel = styled.div`
  color: #004258;
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
`;

const PermissionText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: #333;
  text-transform: capitalize;
`;

const modalStyles = {
  overlay: {
    background: 'transparent'
  },
  modal: {
    padding: '0px'
  }
};

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managementId: null,
      isLoading: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      taxRate: '',
      showModal: false
    };
  }

  componentWillMount() {
    const { profile: { id: userId }, GetManagement } = this.props;
    this.setState({ isLoading: true });
    GetManagement({
      params: {
        'management[user_id]': userId
      },
      success: (management) => {
        this.setState({ isLoading: false });
        this.setManagementToState(management);
      },
      error: (e) => {
        this.setState({ isLoading: false });
        toastr.error('Error', e.message);
      }
    })
  }

  setManagementToState = (management) => {
    const { privilege, providerLocationId, setProfile } = this.props;
    const { id: managementId } = management;
    const user = get(management, 'relationships.user');
    setProfile({ id: user.id, ...user.attributes });
    const { firstName, lastName, phoneNumber, email } = user.attributes;
    this.setState({
      managementId,
      firstName,
      lastName,
      phoneNumber: formatPhoneNumber(phoneNumber, true),
      email
    });
    let tax = 0;
    if (privilege === 'provider') {
      if (providerLocationId) {
        const providerLocation = get(management, 'relationships.providerLocation');
        const { attributes: { taxRate } } = providerLocation;
        tax = (parseFloat(taxRate) * 100).toFixed(1);
      } else {
        const provider = get(management, 'relationships.provider');
        const { attributes: { taxRate } } = provider;
        tax = (parseFloat(taxRate) * 100).toFixed(1);
      }
      this.setState({ taxRate: tax });
    }
  };

  renderEditorSection = () => {
    const { privilege, providerId, profile } = this.props;
    const { firstName, lastName, phoneNumber, email, taxRate } = this.state;
    return (
      <React.Fragment>
        <Row style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <InputLabel>First Name</InputLabel>
            <Input
              type="text"
              value={firstName}
              onChange={this.onChangeFN}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputLabel>Last Name</InputLabel>
            <Input
              type="text"
              value={lastName}
              onChange={this.onChangeLN}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              value={email}
              onChange={this.onChangeEmail}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputLabel>Phone</InputLabel>
            <Input
              type="text"
              mask="(999) 999-9999"
              value={phoneNumber}
              onChange={this.onChangePN}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <InputLabel>Permissions</InputLabel>
            <PermissionText>{`Admin`}</PermissionText>
          </Col>
        </Row>
        <Splitter />
        <Row>
          <Col xs={12} sm={6} md={6}>
            <InputLabel>Security Settings</InputLabel>
            <HollowButton onClick={this.showModal} style={{ margin: 0 }}>
              Change Password
            </HollowButton>
          </Col>
          {
            privilege === 'provider' &&
            <Col xs={12} sm={6} md={4}>
              <InputLabel>Payment Settings</InputLabel>
              <PaymentSettings privilege={privilege} providerId={providerId} profile={profile} />
            </Col>
          }
          {
            privilege === 'provider' &&
            <Col xs={12} sm={6} md={2}>
              <InputLabel>Tax Rate (%)</InputLabel>
              <Input
                type="text"
                value={taxRate}
                onChange={this.onChangeTaxRate}
              />
            </Col>

          }
          {/* <InputWrapper style={{ flex: '2' }} className="secondary">
            <InputLabel>IOS App Version</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: '2' }} className="secondary">
            <InputLabel>Android App Version</InputLabel>
            <Input type="text" />
          </InputWrapper> */}
        </Row>
      </React.Fragment>
    );
  };

  renderActions = () => {
    const { history } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={() => history.goBack()}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
  };

  onSave = () => {
    const { taxRate } = this.state;
    const { privilege, providerId, providerLocationId, UpdateProvider, UpdateProviderLocation } = this.props;
    this.setState({ isLoading: true });
    if (privilege === 'provider') {
      if (providerLocationId) {
        UpdateProviderLocation({
          providerId,
          providerLocationId,
          data: {
            provider_location: { tax_rate: `${parseFloat(taxRate) / 100}` }
          },
          success: () => {
            this.updateProfile();
          },
          error: (e) => {
            this.setState({ isLoading: false });
            toastr.error('Error', e.message);
          }
        });
      } else {
        UpdateProvider({
          authType: 'provider',
          providerId,
          data: {
            provider: { tax_rate: `${parseFloat(taxRate) / 100}` }
          },
          success: () => {
            this.updateProfile();
          },
          error: (e) => {
            this.setState({ isLoading: false });
            toastr.error('Error', e.message);
          }
        });
      }
    } else {
      this.updateProfile();
    }
  };

  updateProfile = () => {
    const { managementId, firstName, lastName, phoneNumber, email } = this.state;
    const { UpdateManagement } = this.props;
    UpdateManagement({
      managementId,
      data: {
        management: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone_number: phoneNumber.trim(),
        }
      },
      success: (management) => {
        this.setManagementToState(management);
        this.setState({ isLoading: false });
        toastr.success('Success', 'Saved successfully!');
      },
      error: (e) => {
        this.setState({ isLoading: false });
        toastr.error('Error', e.message);
      }
    });
  };

  onUpdatePassword = password => {
    const { id } = this.props.profile;
    this.props.updateProfile({
      id,
      data: {
        password,
        passwordConfirmation: password
      }
    });
    this.setState({
      showModal: false
    });
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

  onChangeTaxRate = (evt) => {
    this.setState({
      taxRate: evt.target.value
    });
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  // isLoading = () => {
  //   const { managementStatus, providerStatus } = this.props;
  //   return managementStatus === managementActions.GET_MANAGEMENT ||
  //   managementStatus === managementActions.UPDATE_MANAGEMENT ||
  //   providerStatus === providerActions.UPDATE_PROVIDER;
  // }

  render() {
    const { isLoading, showModal } = this.state;
    return (
      <Wrapper>
        <ContentWrapper>
          <EditorSection actions={this.renderActions()} content={this.renderEditorSection()} />
        </ContentWrapper>
        <Modal styles={modalStyles} open={showModal} onClose={this.closeModal}>
          <PasswordEditor
            onCancel={this.closeModal}
            onSave={this.onUpdatePassword}
          />
        </Modal>
        {isLoading && <LoadingSpinner loading={isLoading} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  providerId: state.auth.providerId,
  providerLocationId: state.auth.providerLocationId,
  managementStatus: state.management.currentStatus,
  providerStatus: state.provider.currentStatus,
  profile: state.profile
});

const mapDispatchToProps = {
  updateProfile,
  setProfile,
  GetManagement,
  UpdateManagement,
  UpdateProvider,
  UpdateProviderLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProfile));
