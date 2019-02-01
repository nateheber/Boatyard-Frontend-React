import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';

import { actionTypes, GetPayments, CreatePayment } from 'store/actions/payments';
import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';
import OrderPaymentModal from '../modals/OrderPaymentModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoItem = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const InfoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Buttons  = styled.div`
  display: flex;
  flex-direction: column;
`;

class PaymentSection extends React.Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    this.loadPayments();
  }

  onCloseModal = () => {
    this.setState({ showModal: false })
  };

  openModal = () => {
    this.setState({ showModal: true })
  };

  renderPayments = () => {
    const { payments } = this.props;
    return payments.map(payment => {
      return (
        <InfoItem key={`payment_${payment.id}`}>
          Payment - {payment.id}
        </InfoItem>
      );
    });
  };

  onSave = (data) => {
    const { CreatePayment } = this.props;
    CreatePayment({
      data,
      success: this.loadPayments
    });  
  };

  loadPayments = () => {
    const { order, GetPayments } = this.props;
    GetPayments({ params: { 'payment[order_id]': order.id } });
  };

  render() {
    const { order, currentStatus } = this.props;
    const { showModal } = this.state;
    const balance = get(order, 'attributes.balance');
    return (
      <Section title="Payment">
        <Wrapper>
          <InfoList>
            {this.renderPayments()}
            <InfoItem>
              Balance Remaining: ${balance}
            </InfoItem>
          </InfoList>
          <Buttons>
            <HollowButton onClick={this.openModal}>Enter Payment</HollowButton>
          </Buttons>
        </Wrapper>
        {(!isEmpty(order) && showModal) && <OrderPaymentModal
          open={showModal}
          loading={currentStatus === actionTypes.CREATE_PAYMENT}
          onSave={this.onSave}
          onClose={this.onCloseModal}
          order={order}
        />}
      </Section>
    )
  }
}


const mapStateToProps = ({ payment: { payments, currentStatus } }) => ({
  currentStatus,
  payments
})

const mapDispatchToProps = {
  GetPayments,
  CreatePayment
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSection);
