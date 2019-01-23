import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import CreditCardSelector from 'components/template/CreditCardSection/CreditCardSelector';

import { fetchCreditCards } from 'store/reducers/creditCards';
import { createPayment } from 'store/reducers/payments';

import ChargeSelector from '../basic/ChargeSelector';


class OrderPaymentModal extends React.Component {
  constructor(props) {
    super(props);
    const { balance } = props;
    this.state = {
      cardId: -1,
      balance,
      fee: 0,
    }
  }

  componentDidMount() {
    this.refreshCards();
  }

  onSelectCard = (cardId) => {
    this.setState({ cardId });
  }

  onChangeCharge = (data) => {
    this.setState(data);
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
        amount: balance,
        boatyardFee: fee
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
    const { balance, fee } = this.state;
    const charging = parseFloat(balance) + parseFloat(fee);
    const action = [<HollowButton onClick={onClose}>Cancel</HollowButton>, <OrangeButton onClick={this.onSave}>Charge ${charging}</OrangeButton>];
    return (
      <Modal
        title="Enter Payment Info"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={7}>
            <CreditCardSelector
              userId={userId}
              creditCards={creditCards}
              onChange={this.onSelectCard}
              refreshCards={this.refreshCards}
            />
          </Col>
          <Col sm={5}>
            <ChargeSelector balance={balance} fee={fee} onChange={this.onChangeCharge} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = ({ creditCard: { creditCards: { creditCards } } }) => ({
  creditCards,
})

const mapDispatchToProps = {
  fetchCreditCards,
  createPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentModal);
