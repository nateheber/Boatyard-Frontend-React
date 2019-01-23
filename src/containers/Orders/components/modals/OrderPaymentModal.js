import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import { get } from 'lodash'

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import CreditCardSelector from 'components/template/CreditCardSection/CreditCardSelector';
import PaymentSelector from 'components/template/CreditCardSection/PaymentSelector';

import { fetchCreditCards } from 'store/reducers/creditCards';
import { createPayment } from 'store/reducers/payments';

import ChargeSelector from '../basic/ChargeSelector';

const tabs = ['Credit Card', 'Cash/Check'];

class OrderPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    const { balance } = props;
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
    const { balance, fee, cardId } = this.state;
    const { orderId, userId, providerId }  = this.props;
    this.props.createPayment({
      data: {
        orderId,
        userId,
        creditCardId: cardId,
        providerId,
        amount: parseFloat(balance),
        boatyardFee: parseFloat(fee)
      },
      callback: this.props.onClose
    })
  }

  refreshCards = () => {
    const { userId, fetchCreditCards } = this.props;
    fetchCreditCards(userId);
  }

  render() {
    const { open, onClose, creditCards, userId } = this.props;
    const { balance, fee, tab } = this.state;
    const charging = parseFloat(balance) + parseFloat(fee);
    const action = [
      <HollowButton onClick={onClose}>Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave}>{tab === 'Credit Card' ? `Charge $${charging}` : 'Confirm Payment'}</OrangeButton>
    ];
    const cards = get(creditCards, 'creditCards', []);
    return (
      <Modal
        title="Enter Payment Info"
        actions={action}
        open={open}
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
                  userId={userId}
                  creditCards={cards}
                  onChange={this.onSelectCard}
                  refreshCards={this.refreshCards}
                />
              ) : (
                <PaymentSelector onChange={this.onSelectPaymentMethod} />
              )
            }
          </Col>
          <Col sm={5}>
            <ChargeSelector balance={balance} fee={fee} onChange={this.onChangeCharge} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ creditCard: { creditCards } }) => ({
  creditCards,
})

const mapDispatchToProps = {
  fetchCreditCards,
  createPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentModal);
