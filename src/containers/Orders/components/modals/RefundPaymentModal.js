import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { get } from 'lodash';

import { GetCreditCards } from 'store/actions/credit-cards';
import { CreatePayment } from 'store/actions/payments';
import ChargeSelector from '../basic/ChargeSelector';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import CreditCardSelector from 'components/template/CreditCardSection/CreditCardSelector';
import PaymentSelector from 'components/template/CreditCardSection/PaymentSelector';
import { getUserFromOrder, getProviderFromOrder } from 'utils/order'

const tabs = ['Credit Card', 'Cash/Check'];

class RefundPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    const { order } = props;
    const balance = get(order, 'attributes.balance');
    this.state = {
      cardId: -1,
      balance,
      fee: 0,
      tab: 'Credit Card',
      paymentMethod: '',
    }
  }

  componentDidMount() {
    this.refreshCards();
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

  onSave = () => {
    const { order, privilege, CreatePayment, onSave }  = this.props;
    const { balance, fee, cardId } = this.state;
    const user = getUserFromOrder(order);
    const provider = getProviderFromOrder(order);

    const data = privilege === 'admin' ? {
      orderId: order.id,
      creditCardId: cardId,
      providerId: provider.id,
      amount: parseFloat(balance),
      boatyardFee: parseFloat(fee)
    } : {
      orderId: order.id,
      creditCardId: cardId,
      amount: parseFloat(balance)
    };
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

  refreshCards = () => {
    const { order, GetCreditCards } = this.props;
    const user = getUserFromOrder(order);
    let params = {};
    if (user.type === 'child_accounts') {
      params = {'credit_card[child_account_id]': user.id };
    } else {
      params = {'credit_card[user_id]': user.id };
    }
    GetCreditCards({ params });
  }

  render() {
    const { open, loading, onClose, creditCards, privilege, order } = this.props;
    const { balance, fee, tab } = this.state;
    const charging = parseFloat(balance) + parseFloat(fee);
    const user = getUserFromOrder(order);
    const action = [
      <HollowButton onClick={onClose} key="Cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="Next">{tab === 'Credit Card' ? `Charge $${charging}` : 'Confirm Payment'}</OrangeButton>
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
                  refreshCards={this.refreshCards}
                />
              ) : (
                <PaymentSelector onChange={this.onSelectPaymentMethod} />
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
  GetCreditCards,
  CreatePayment
}

export default connect(mapStateToProps, mapDispatchToProps)(RefundPaymentModal);
