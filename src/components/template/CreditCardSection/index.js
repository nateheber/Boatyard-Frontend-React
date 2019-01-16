import React from 'react'
import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import { Section } from 'components/basic/InfoSection'

import InfoSection from './InfoSection'
import ListModal from './ListModal'

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
    const { showPaymentModal } = this.state;
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ creditCard: { creditCards : {creditCards} } }) => ({
  creditCards
})

export default connect(mapStateToProps)(CreditCardSection)
