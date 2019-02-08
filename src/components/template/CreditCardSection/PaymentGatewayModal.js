import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { set, get, isEmpty } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import { Selector, Input } from 'components/basic/Input';
import Modal from 'components/compound/Modal';
import { toastr } from 'react-redux-toastr';

import { CreatePaymentGateway } from 'store/actions/paymentGateway';

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
              providerId,
              credentials: {
                gatewayType: gateway.value,
                ...credential
              }
            }
          : {
              credentials: {
                gatewayType: gateway.value,
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

  getActions = () => {
    const { step } = this.state;
    if (step === 'gateway') {
      return [<OrangeButton onClick={this.next}>Next</OrangeButton>];
    }
    return [<OrangeButton onClick={this.connect}>Connect</OrangeButton>];
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
    return (
      <Wrapper>
        <Title>
          Please enter the information below to connect your payment gateway:
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
    const actions = this.getActions();
    return (
      <Modal
        title="New Payment Method"
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

const mapDispatchToProps = {
  CreatePaymentGateway
};

export default connect(
  null,
  mapDispatchToProps
)(PaymentGatewayModal);
