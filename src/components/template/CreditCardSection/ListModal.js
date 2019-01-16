import React from 'react';
import { connect } from 'react-redux';

import { updateCreditCard, deleteCreditCard } from 'reducers/creditCards';

import { HollowButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal'

import CreditCard from './CreditCard'

class ListModal extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }

  setDefault = (id) => {
    const data = {
      isDefault: true,
    }
    this.props.updateCreditCard({ creditCardId: id, data, callback: this.props.refreshCards })
  }

  removeCard = (id) => {
    this.props.deleteCreditCard({
      creditCardId: id,
      callback: this.props.refreshCards
    })
  }

  render() {
    const { open, onClose, creditCards, onNew } = this.props
    return (
      <Modal
        title="Edit Customer Information"
        actions={[]}
        open={open}
        onClose={onClose}
      >
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
        <HollowButton onClick={onNew}>New Payment Method</HollowButton>
      </Modal>
    );
  }
}

const mapStateToProps = ({ creditCard: { creditCards: { creditCards } } }) => ({
  creditCards,
})

const mapDispatchToProps = {
  updateCreditCard,
  deleteCreditCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModal);