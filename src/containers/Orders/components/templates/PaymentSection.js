import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty, find, map, orderBy, filter } from 'lodash';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { GetCreditCards } from 'store/actions/credit-cards';
import { actionTypes, GetPayments, CreatePayment, UpdatePayment, DeletePayment } from 'store/actions/payments';
import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';
import OrderPaymentModal from '../modals/OrderPaymentModal';
import RefundPaymentModal from '../modals/RefundPaymentModal';
import { getUserFromOrder, getChildAccountFromOrder } from 'utils/order'

const PAYMENT_TYPES = {
  cash: 'Cash',
  check: 'Check',
  credit: 'Credit Card'
};

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
  margin-bottom: 2px;
`;

const InfoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Buttons  = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -5px;
  margin-right: -5px;
  @media (max-width: 600px) {
    justify-content: space-evenly;
  }
`;

class PaymentSection extends React.Component {
  state = {
    visibleOfCreateModal: false,
    visibleOfRefundModal: false,
    newPayments: [],
  };

  componentDidMount() {
    this.loadPayments();
    this.refreshCards();
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

  getCreditCard = ({relationships: {creditCard: {data}}}) => {
    const { paymentsIncluded } = this.props;
    return find(paymentsIncluded, data) || {attributes: {name: '', last4: ''}};
  }

  refreshCards = () => {
    const { order, privilege, GetCreditCards } = this.props;

    let user = getUserFromOrder(order);
    if (privilege === 'provider') {
      user = getChildAccountFromOrder(order);
      //user = getUserFromOrder(order, 'provider');
    }

    let params = {};
    if (privilege === 'admin' && user && user.id) {
      params = {'credit_card[user_id]': user.id };
    } else if (user.type === 'child_accounts') {
      params = {'credit_card[child_account_id]': user.id };
    } else {
      return;
    }
    GetCreditCards({ params });
  }

  renderPayments = () => {
    let { payments } = this.props;
    payments = orderBy(payments, ['attributes.updatedAt', 'asc']);
    return payments.map(payment => {
      const { amount, updatedAt, createdAt, paymentType, state } = payment.attributes;
      const amountInFloat = parseFloat(amount);
      const cc = this.getCreditCard(payment);
      const paidText = paymentType === 'credit' ?
        `${cc.attributes.name.toUpperCase()} xxxx${cc.attributes.last4}` : PAYMENT_TYPES[paymentType];
      const subjectText = state === 'refunded' ? 'refunded to' : 'paid by';
      return (
        <InfoItem key={`payment_${payment.id}`}>
          {
            state === 'failed' ?
            '': <>${amountInFloat.toFixed(2)} {subjectText} {paidText} on {moment(updatedAt).format('MMM D, YYYY')} at {moment(updatedAt).format('h:mm A')}</>
          }
          {/* ${amountInFloat.toFixed(2)} {subjectText} {paidText} on {moment(updatedAt).format('MMM D, YYYY')} at {moment(updatedAt).format('h:mm A')} */}
          {
            state === 'refunded' &&
            <>
              <br/>
             { state === 'failed' ? '' : <>${amountInFloat.toFixed(2)} paid by {paidText} on {moment(createdAt).format('MMM D, YYYY')} at {moment(createdAt).format('h:mm A')}</> }
            </>
          }

        </InfoItem>
      );
    });
  };

  onSave = (data) => {
    const { CreatePayment, onFinished, order: {attributes: { stateAlias  } } } = this.props;
    if (stateAlias === 'Awaiting Acceptance' || stateAlias === 'Draft') {
      toastr.error('Error', 'Payments can only be processed on orders that are in-progress.');
      this.hideCreateModal();
    } else {
      CreatePayment({
        data,
        success: () => {
          this.hideCreateModal();
          this.loadPayments();
          if (onFinished) {
            onFinished();
          };
          // const allPayments = orderBy(this.props.payments, ['id', 'asc']);
          // const payment = allPayments[allPayments.length - 1];
          // if (payment.attributes.state === 'failed') {
          //   toastr.error('Error', payment.attributes.spreedlyMessage);
          // }
        },
        error: (e) => {
          console.log("onSave in PaymentSection - The payment failed to create somewhere in the DB");
          toastr.error('Error', 'Payment Failed - Invalid Card');
        }
      });
    }
  };

  onRefund = (paymentId) => {
    const payment = this.props.payments[this.props.payments.length - 1];
    const { UpdatePayment, onFinished, DeletePayment } = this.props;
    if (payment.attributes.paymentType === 'cash' || payment.attributes.paymentType === 'check') {
      DeletePayment({
        paymentId,
        success: () => {
          this.hideRefundModal();
          this.loadPayments();
          if (onFinished) {
            onFinished();
          }
        },
        error: (e) => {
          console.log(`API Error: ${e.message}`);
          toastr.error('Error', e.message);
        }
    })
   } else {
    UpdatePayment({
      paymentId,
      data: {
        payment: {
          transition: "refund"
        }
      },
      success: () => {
        this.hideRefundModal();
        this.loadPayments();
        if (onFinished) {
          onFinished();
        }
      }
    });
  }
  };

  loadPayments = () => {
    const { order, GetPayments } = this.props;
    GetPayments({ params: { 'payment[order_id]': order.id }});
    this.setState({newPayments: this.props.payments});
  };

  render() {
    const { order, currentStatus, payments } = this.props;
    //console.log(this.props.creditCards);
    const { visibleOfCreateModal, visibleOfRefundModal } = this.state;
    const refundablePayments = map(
      filter(payments, {attributes: {refundable: true}}),
      // payments,
      payment => { return {...payment, cc: this.getCreditCard(payment)}}
    );
    const cashRefundablePayments = filter(payments, function(o) { return o.attributes.paymentType ==='cash' || o.attributes.paymentType ==='check' } );
    //console.log(cashRefundablePayments);
    const balance = parseFloat(get(order, 'attributes.balance'));
    // console.log(refundablePayments);
    //console.log(payments);
    return (
      <Section title="Payment">
        <Wrapper>
          <InfoList>
            {payments && this.renderPayments()}
            <InfoItem style={{ marginTop: 5 }}>
              Balance Remaining: ${balance.toFixed(2)}
            </InfoItem>
          </InfoList>
          <Buttons>
            {
              (refundablePayments.length > 0 || cashRefundablePayments.length > 0) && <HollowButton onClick={this.showRefundModal}>Refund</HollowButton>
            }
            {
              balance > 0 && <HollowButton onClick={this.showCreateModal}>Enter Payment</HollowButton>
            }
          </Buttons>
        </Wrapper>
        {(!isEmpty(order) && visibleOfCreateModal) && <OrderPaymentModal
          open={visibleOfCreateModal}
          loading={currentStatus === actionTypes.CREATE_PAYMENT}
          onSave={this.onSave}
          onClose={this.hideCreateModal}
          refreshCards={this.refreshCards}
          order={order}
          processPayment={this.processPayment}
        />}
        {(!isEmpty(order) && (refundablePayments.length > 0 || cashRefundablePayments.length > 0) && visibleOfRefundModal) && <RefundPaymentModal
          open={visibleOfRefundModal}
          loading={currentStatus === actionTypes.UPDATE_PAYMENT}
          onRefund={this.onRefund}
          onClose={this.hideRefundModal}
          order={order}
          payments={refundablePayments.concat(cashRefundablePayments)}
        />}
      </Section>
    )
  }
}


const mapStateToProps = ({ payment: { payments, currentStatus, included }, order, creditCard: {creditCards}, auth: { privilege }}) => ({
  currentStatus,
  payments,
  paymentsIncluded: included,
  orderStatus: order.currentStatus,
  creditCards,
  privilege
})

const mapDispatchToProps = {
  GetPayments,
  CreatePayment,
  UpdatePayment,
  DeletePayment,
  GetCreditCards
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSection);

