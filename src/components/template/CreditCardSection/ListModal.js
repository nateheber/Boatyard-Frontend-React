import React from 'react';
import { connect } from 'react-redux';
import { get, capitalize } from 'lodash';
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { updateCreditCard, deleteCreditCard } from 'store/reducers/creditCards';

import { HollowButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';

import CreditCard from './CreditCard';

const Wrapper = styled(Row)`
  height: 35px;
  padding: 0 10px;
  > div {
    font-size: 10pt;
    line-height: 1.42857;
    font-weight: 600;
    font-family: Montserrat, sans-serif;
    color: #003247;
  }
`;

const CreditList = styled.div`
  padding-bottom: 20px;
`;
class ListModal extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  };

  setDefault = (id) => {
    const data = {
      isDefault: true,
    }
    this.props.updateCreditCard({ creditCardId: id, data, callback: this.props.refreshCards })
  };

  removeCard = (id) => {
    this.props.deleteCreditCard({
      creditCardId: id,
      callback: this.props.refreshCards
    })
  };

  render() {
    const { open, onClose, creditCards, onNew } = this.props;
    return (
      <Modal
        title="Payment Methods"
        open={open}
        small={true}
        onClose={onClose}
      >
        <Wrapper>
          <Col sm={6}>
            {capitalize('Payment Method')}
          </Col>
          <Col sm={4}>
            {capitalize('Set Default')}
          </Col>
          <Col sm={2}>
          </Col>
        </Wrapper>
        <CreditList>
          {
            creditCards.map(creditCard => (
              <CreditCard
                creditCard={creditCard}
                onSetDefault={this.setDefault}
                onRemove={this.removeCard}
                key={`credit_card_${creditCard.id}`}
              />
            ))
          }
        </CreditList>
        <HollowButton onClick={onNew}>New Payment Method</HollowButton>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  creditCards: get(state, 'creditCard.creditCards.creditCards', [])
});

const mapDispatchToProps = {
  updateCreditCard,
  deleteCreditCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListModal);