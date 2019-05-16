import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { formatPhoneNumber } from 'utils/basic';
import { Row, Col } from 'react-flexbox-grid';

import { actionTypes as managementActions, GetManagement, UpdateManagement } from 'store/actions/managements';
import { actionTypes as providerActions, GetProvider, UpdateProvider } from 'store/actions/providers';
import { Input } from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import PaymentSettings from './components/PaymentSettings';
import PasswordEditor from './components/PasswordEditor';

import { updateProfile } from 'store/reducers/profile';

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
    const { firstName, lastName, phoneNumber, email } = props.profile;
    this.state = {
      firstName,
      lastName,
      phoneNumber: formatPhoneNumber(phoneNumber),
      email,
      taxRate: '',
      showModal: false
    };
  }

  renderEditorSection = () => {
    const { privilege } = this.props;
    const { firstName, lastName, phoneNumber, email, taxRate, type } = this.state;
    return (
      <React.Fragment>
        <Row style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <InputLabel>First Name</InputLabel>
            <Input
              type="text"
              defaultValue={firstName}
              onChange={this.onChangeFN}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputLabel>Last Name</InputLabel>
            <Input
              type="text"
              defaultValue={lastName}
              onChange={this.onChangeLN}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              defaultValue={email}
              onChange={this.onChangeEmail}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputLabel>Phone</InputLabel>
            <Input
              type="text"
              defaultValue={phoneNumber}
              onChange={this.onChangePN}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <InputLabel>Permissions</InputLabel>
            <PermissionText>{type}</PermissionText>
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
              <PaymentSettings />
            </Col>
          }
          {
            privilege === 'provider' &&
            <Col xs={12} sm={6} md={2}>
              <InputLabel>Tax Rate (%)</InputLabel>
              <Input
                type="text"
                defaultValue={taxRate}
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
  }

  renderActions = () => {
    const { history } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={() => history.goBack()}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
  }

  onSave = () => {
    const { id } = this.props.profile;
    this.props.updateProfile({ id, data: this.state });
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

  render() {
    const { showModal } = this.state;
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
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  managementStatus: state.management.currentStatus,
  providerStatus: state.provider.currentStatus,
  profile: state.management.currentManagement,
  provider: state.provider.currentProvider
});

const mapDispatchToProps = {
  updateProfile,
  GetManagement,
  UpdateManagement,
  GetProvider,
  UpdateProvider
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProfile));
