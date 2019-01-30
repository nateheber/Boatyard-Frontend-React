import React from 'react'
import { connect } from 'react-redux'
import { findIndex, isEmpty } from 'lodash'

import { Section } from 'components/basic/InfoSection'
import { NormalText } from 'components/basic/Typho'
import InfoSection from './InfoSection'
import ListModal from './ListModal'
import CreationModal from './CreationModal'


class CreditCardSection extends React.Component {
  state = {
    showPaymentModal: false,
    showNewPaymentModal: false,
  }

  showListModal = () => {
    this.setState({
      showPaymentModal: true,
    })
  }

  closeListModal = () => {
    this.setState({
      showPaymentModal: false,
    })
  }

  showCreationModal = () => {
    this.setState({
      showListModal: false,
      showNewPaymentModal: true,
    })
  }

  closeCreationModal = () => {
    this.setState({
      showNewPaymentModal: false,
    })
  }

  getDefaultCard = () => {
    const { creditCards } = this.props;
    const idx = findIndex(creditCards, card => card.attributes.isDefault);
    if (idx >= 0) {
      return creditCards[idx].attributes;
    }
    return {}
  }

  render() {
    const card = this.getDefaultCard();
    const { showPaymentModal, showNewPaymentModal } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <Section title="Payment Methods" mode="view" onEdit={this.showListModal} >
          {!isEmpty(card) ?
           <InfoSection creditCard={card} />
           :
           <NormalText>There are no payment methods.</NormalText>
          }
        </Section>
        <ListModal
          open={showPaymentModal}
          onClose={this.closeListModal}
          onNew={this.showCreationModal}
          refreshCards={this.props.onRefresh}
        />
        <CreationModal
          user={user}
          open={showNewPaymentModal}
          onClose={this.closeCreationModal}
          refreshCards={this.props.onRefresh}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ creditCard: { creditCards } }) => ({
  creditCards
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardSection)
