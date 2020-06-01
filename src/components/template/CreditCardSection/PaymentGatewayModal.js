import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { set, get, isEmpty } from 'lodash';
import { apiBaseUrl } from 'api/config';
import { OrangeButton } from 'components/basic/Buttons';
import { Selector, Input } from 'components/basic/Input';
import Modal from 'components/compound/Modal';
import { toastr } from 'react-redux-toastr';

import { CreatePaymentGateway } from 'store/actions/paymentGateway';
import { getToken } from 'store/selectors/auth';

import { gatewayOptions } from 'utils/paymentGateway';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 21px;
  color: #003247;
  margin-bottom: 20px;
`;

const SelectorWrapper = styled.div`
  display: inline-block;
  width: 200px;
`;

const InputField = styled(Input)`
  text-align: center;
  margin-bottom: 14px;
`;

class PaymentGatewayModal extends React.Component {
  state = {
    step: 'gateway',
    gateway: {},
    credential: {}
  };

  componentDidUpdate() {
    if (this.state.step !== 'gateway' && this.state.gateway.value === 'wepay' && isEmpty(this.state.credential)) {
      let creds = {
        first_name: this.props.profile.firstName,
        last_name: this.props.profile.lastName,
        email: this.props.profile.email
      };
      this.setState({credential: creds});
    }
  }

  onChangeGateway = gateway => {
    this.setState({ gateway });
  };

  onChangeField = field => event => {
    const credential = { ...this.state.credential };
    set(credential, field, event.target.value);
    this.setState({ credential });
  };

  onSuccess = () => {
    this.onClose();
    toastr.success('Payment Gateway Created!');
  }

  onError = () => {
    toastr.error('Payment Gateway Error', 'Invalid Credentials')
  }

  onClose = () => {
    this.props.onClose();
    this.setState({ step: 'gateway', gateway: {}, credential: {} });
  }

  next = () => {
    if (!isEmpty(this.state.gateway)) {
      this.setState({ step: 'gatewayInfo', credential: {} });
    }
  };

  isValid = () => {
    const { gateway, credential } = this.state;
    const { fields } = gateway;
    return fields.reduce((prev, field) => {
      if (prev === false) {
        return false;
      }
      const value = get(credential, field.name);
      if (isEmpty(value)) {
        return false;
      }
      return true;
    }, true);
  };

  connect = () => {
    if (this.isValid()) {
      const { gateway, credential } = this.state;
      const { providerId } = this.props;
      this.props.CreatePaymentGateway({
        data: providerId
          ? {
              provider_id: providerId,
              credentials: {
                gateway_type: gateway.value,
                ...credential
              }
            }
          : {
              credentials: {
                gateway_type: gateway.value,
                ...credential
              }
            },
        success: this.onSuccess,
        error: this.onError,
      });
    } else {
      console.log('invalid');
    }
  };

  createWePay = () => {
    if (this.isValid()) {
      const { credential } = this.state;
      const { providerId, token } = this.props;
      let headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': token
      }
      axios.post(`${apiBaseUrl}/merchant_accounts`, { merchant_account: {
        email: credential.email,
        first_name: credential.first_name,
        last_name: credential.last_name,
        tos_acceptance: true,
        provider_id: providerId
      }}, {
        headers: headers
      }).then(() => {
        this.onSuccess();
      }).catch(e =>  {
        this.onError();
      });
    } else {
      console.log('something is invalid');
    }
  }

  getActions = () => {
    const { step, gateway } = this.state;
    if (step === 'gateway') {
      return [<OrangeButton key={`btn_next`} onClick={this.next}>Next</OrangeButton>];
    }
    if (gateway.value === 'wepay') {
      return [<OrangeButton key={`btn_connect`} onClick={this.createWePay}>Create Account</OrangeButton>];
    }
    return [<OrangeButton key={`btn_connect`} onClick={this.connect}>Connect</OrangeButton>];
  };

  renderGatewaySelection = () => {
    const { gateway } = this.state;
    return (
      <Wrapper>
        <Title>Choose Payment Gateway</Title>
        <SelectorWrapper>
          <Selector
            value={gateway}
            onChange={this.onChangeGateway}
            options={gatewayOptions}
          />
        </SelectorWrapper>
      </Wrapper>
    );
  };

  renderInfoSelection = () => {
    const { gateway, credential } = this.state;
    const { fields } = gateway;
    // console.log(this.props);
    // console.log(gateway);
    // console.log(credential);
    return (
      <Wrapper>
        <Title>
          {gateway.value === 'wepay' ? 'Please enter a contact name and email to create your WePay Account.' : 'Please enter the information below to connect your payment gateway:'}
        </Title>
        {fields.map((field, idx) => (
          <InputField
            type="text"
            value={get(credential, field.name, '')}
            onChange={this.onChangeField(field.name)}
            placeholder={field.placeholder}
            key={`field_${idx}`}
          />
        ))}
      </Wrapper>
    );
  };

  renderContent = () => {
    const { step } = this.state;
    if (step === 'gateway') {
      return this.renderGatewaySelection();
    }
    return this.renderInfoSelection();
  };

  render() {
    const { open } = this.props;
    const { gateway } = this.state;
    const gatewayVal = gateway.hasOwnProperty('value') ? gateway.value : '';
    const actions = this.getActions();
    return (
      <Modal
        title={gatewayVal === 'wepay' ? "Create WePay Account" : "New Payment Method"}
        actions={actions}
        open={open}
        onClose={this.onClose}
        normal
        centered
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  CreatePaymentGateway
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentGatewayModal);
