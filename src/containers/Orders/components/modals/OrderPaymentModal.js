import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { get } from 'lodash';

import { CreatePayment } from 'store/actions/payments';
import ChargeSelector from '../basic/ChargeSelector';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import CreditCardSelector from 'components/template/CreditCardSection/CreditCardSelector';
import PaymentSelector from 'components/template/CreditCardSection/PaymentSelector';
import { getUserFromOrder, getChildAccountFromOrder, getProviderFromOrder } from 'utils/order'

const tabs = ['Credit Card', 'Cash/Check'];

class OrderPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    const { order } = props;
    const balance = get(order, 'attributes.balance');
    this.state = {
      cardId: -1,
      balance,
      fee: 0,
      tab: 'Credit Card',
      paymentMethod: 'cash'
    }
  }

  onSelectCard = (cardId) => {
    this.setState({ cardId });
  }

  onSelectPaymentMethod = (paymentMethod) => {
    this.setState({ paymentMethod });
  }

  onChangeCharge = (data) => {
    this.setState(data);
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
  }

  handleSave = () => {
    const { order, privilege, CreatePayment, onSave }  = this.props;
    const { balance, fee, cardId, tab, paymentMethod } = this.state;
    let user = getUserFromOrder(order);
    if (privilege === 'provider') {
      user = getChildAccountFromOrder(order);
    }
    const provider = getProviderFromOrder(order);

    const data = privilege === 'admin' ? {
      order_id: order.id,
      provider_id: provider.id,
      amount: parseFloat(balance).toFixed(2),
      boatyard_fee: parseFloat(fee).toFixed(2)
    } : {
      order_id: order.id,
      amount: parseFloat(balance).toFixed(2)
    };
    if (tab === 'Credit Card') {
      data['credit_card_id'] = cardId;
    } else {
      data['payment_type'] = paymentMethod;
    }
    if (user.type === 'child_accounts') {
      data['child_account_id'] = user.id;
    } else {
      data['user_id'] = user.id;
    }
    if (onSave) {
      onSave({ payment: { ...data }});
    } else {
      CreatePayment({
        data: { payment: { ...data }},
        success: this.props.onClose
      });  
    }
  }

  render() {
    const { open, loading, onClose, creditCards, privilege, order } = this.props;
    const { balance, fee, tab, paymentMethod } = this.state;
    const charging = parseFloat(parseFloat(parseFloat(balance || '0').toFixed(2)) + parseFloat(parseFloat(fee || '0').toFixed(2))).toFixed(2);
    let user = getUserFromOrder(order);
    if (privilege === 'provider') {
      user = getChildAccountFromOrder(order);
    }
    const action = [
      <HollowButton onClick={onClose} key="Cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.handleSave} key="Next">{tab === 'Credit Card' ? `Charge $${charging}` : 'Confirm Payment'}</OrangeButton>
    ];
    return (
      <Modal
        title="Enter Payment Info"
        actions={action}
        open={open}
        loading={loading}
        onClose={onClose}
        tabs={tabs}
        selected={tab}
        onSelect={this.onChangeTab}
      >
        <Row>
          <Col sm={7}>
            {
              tab === 'Credit Card' ? (
                <CreditCardSelector
                  user={user}
                  creditCards={creditCards}
                  onChange={this.onSelectCard}
                  refreshCards={this.props.refreshCards}
                />
              ) : (
                <PaymentSelector selected={paymentMethod} onChange={this.onSelectPaymentMethod} />
              )
            }
          </Col>
          <Col sm={5}>
            <ChargeSelector previlage={privilege} balance={balance} fee={fee} onChange={this.onChangeCharge} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ creditCard: { creditCards }, auth: { privilege } }) => ({
  creditCards,
  privilege
})

const mapDispatchToProps = {
  CreatePayment
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentModal);
