import React from 'react'
import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import { Section } from 'components/basic/InfoSection'

import { resetError } from 'reducers/creditCards'

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
    this.props.resetError();
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
    const { userId } = this.props;
    return (
      <React.Fragment>
        <Section title="Payment Methods" mode="view" onEdit={this.showListModal} >
          <InfoSection creditCard={card} />
        </Section>
        <ListModal
          open={showPaymentModal}
          onClose={this.closeListModal}
          onNew={this.showCreationModal}
          refreshCards={this.props.onRefresh}
        />
        <CreationModal
          userId={userId}
          open={showNewPaymentModal}
          onClose={this.closeCreationModal}
          refreshCards={this.props.onRefresh}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ creditCard: { creditCards : {creditCards} } }) => ({
  creditCards
})

const mapDispatchToProps = {
  resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardSection)
