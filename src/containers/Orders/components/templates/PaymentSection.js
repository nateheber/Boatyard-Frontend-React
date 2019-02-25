import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import { actionTypes, GetPayments, CreatePayment } from 'store/actions/payments';
import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';
import OrderPaymentModal from '../modals/OrderPaymentModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
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
  margin-bottom: 15px;
`;

const Buttons  = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    justify-content: space-evenly;
  }
`;

class PaymentSection extends React.Component {
  state = {
    visibleOfCreateModal: false,
    visibleOfRefundModal: false
  };

  componentDidMount() {
    this.loadPayments();
  }

  hideCreateModal = () => {
    this.setState({ visibleOfCreateModal: false });
  };

  showCreateModal = () => {
    this.setState({ visibleOfCreateModal: true });
  };

  hideRefundModal = () => {
    this.setState({ visibleOfRefundModal: false });
  };

  showRefundModal = () => {
    this.setState({ visibleOfRefundModal: true });
  };

  renderPayments = () => {
    const { payments } = this.props;
    return payments.map(payment => {
      const { amount, createdAt } = payment.attributes;
      const amountInFloat = parseFloat(amount);
      return (
        <InfoItem key={`payment_${payment.id}`}>
          ${amountInFloat.toFixed(2)} paid by Credit Card - {moment(createdAt).format('MMM D, YYYY')}
        </InfoItem>
      );
    });
  };

  onSave = (data) => {
    const { CreatePayment, onFinished } = this.props;
    CreatePayment({
      data,
      success: () => {
        this.hideCreateModal();
        this.loadPayments();
        if (onFinished) {
          onFinished();
        }
      }
    });  
  };

  loadPayments = () => {
    const { order, GetPayments } = this.props;
    GetPayments({ params: { 'payment[order_id]': order.id } });
  };

  render() {
    const { order, currentStatus } = this.props;
    const { visibleOfCreateModal } = this.state;
    const balance = get(order, 'attributes.balance');
    return (
      <Section title="Payment">
        <Wrapper>
          <InfoList>
            {this.renderPayments()}
            <InfoItem>
              Balance Remaining: ${parseFloat(balance).toFixed(2)}
            </InfoItem>
          </InfoList>
          <Buttons>
            <HollowButton onClick={this.showRefundModal}>Refund</HollowButton>
            <HollowButton onClick={this.showCreateModal}>Enter Payment</HollowButton>
          </Buttons>
        </Wrapper>
        {(!isEmpty(order) && visibleOfCreateModal) && <OrderPaymentModal
          open={visibleOfCreateModal}
          loading={currentStatus === actionTypes.CREATE_PAYMENT}
          onSave={this.onSave}
          onClose={this.hideCreateModal}
          order={order}
        />}
      </Section>
    )
  }
}


const mapStateToProps = ({ payment: { payments, currentStatus }, order }) => ({
  currentStatus,
  payments,
  orderStatus: order.currentStatus
})

const mapDispatchToProps = {
  GetPayments,
  CreatePayment
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSection);
