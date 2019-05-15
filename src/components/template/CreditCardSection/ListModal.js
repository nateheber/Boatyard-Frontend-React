import React from 'react';
import { connect } from 'react-redux';
import { get, capitalize } from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';

import { actionTypes, UpdateCreditCard, DeleteCreditCard } from 'store/actions/credit-cards';

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
      is_default: true,
    }
    this.props.UpdateCreditCard({ creditCardId: id, data, success: this.props.refreshCards })
  };

  removeCard = (id) => {
    this.props.DeleteCreditCard({
      creditCardId: id,
      success: this.props.refreshCards
    })
  };

  render() {
    const { open, onClose, creditCards, onNew, currentStatus } = this.props;
    return (
      <Modal
        title="Payment Methods"
        open={open}
        small={true}
        loading={currentStatus === actionTypes.UPDATE_CREDIT_CARD}
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
  currentStatus: state.creditCard.currentStatus,
  creditCards: get(state, 'creditCard.creditCards', [])
});

const mapDispatchToProps = {
  UpdateCreditCard,
  DeleteCreditCard
};

export default connect(mapStateToProps, mapDispatchToProps)(ListModal);