import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';
import { Selector, Input } from 'components/basic/Input'
import Modal from 'components/compound/Modal';

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
`

const InputField = styled(Input)`
  text-align: center;
  margin-bottom: 14px;
`;

const options = [
  { value: 'Authorize.Net', label: 'AUTHORIZE.NET' },
]

export default class PaymentGatewayModal extends React.Component {
  state = {
    step: 'gateway',
    gateway: {},
    loginId: '',
    transactionKey: '',
  }

  onChangeGateway = (gateway) => {
    this.setState({ gateway });
  }

  next = () => {
    this.setState({ step: 'gatewayInfo' });
  };

  connect = () => {
    const { gateway, loginId, transactionKey } = this.state;
    this.props.connect({ gateway: gateway.value, loginId, transactionKey });
  }

  getActions = () => {
    const { step } = this.state;
    if (step === 'gateway') {
      return [<OrangeButton onClick={this.next}>Next</OrangeButton>];
    }
    return [<OrangeButton onClick={this.connect}>Connect</OrangeButton>];
  }

  renderGatewaySelection = () => {
    const { gateway } = this.state;
    return (
      <Wrapper>
        <Title>Choose Payment Gateway</Title>
        <SelectorWrapper>
          <Selector
            value={gateway}
            onChange={this.onChangeGateway}
            options={options}
          />
        </SelectorWrapper>
      </Wrapper>
    )
  }

  renderInfoSelection = () => {
    const { gateway } = this.state;
    return (
      <Wrapper>
        <Title>Please enter the information below to connect your payment gateway:</Title>
        <InputField type="text" onChange={this.onChangeLoginId} placeholder={`Your ${gateway.value} API Login ID`} />
        <InputField type="text" onChange={this.onChangeTransactionKey} placeholder={`Your ${gateway.value} Transaction Key`} />
      </Wrapper>
    )
  }

  renderContent = () => {
    const { step } = this.state;
    if (step === 'gateway') {
      return this.renderGatewaySelection();
    }
    return this.renderInfoSelection();
  }

  render() {
    const { open, onClose } = this.props;
    const actions = this.getActions();
    return (
      <Modal
        title="New Payment Method"
        actions={actions}
        open={open}
        onClose={onClose}
        normal
        centered
      >
        {this.renderContent()}
      </Modal>
    );
  }
}
