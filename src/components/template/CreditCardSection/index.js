import React from 'react';
import { connect } from 'react-redux';

import { Section } from 'components/basic/InfoSection';
import { NormalText } from 'components/basic/Typho';
import InfoSection from './InfoSection';
import ListModal from './ListModal';
import CreationModal from './CreationModal';


class CreditCardSection extends React.Component {
  state = {
    showPaymentModal: false,
    showNewPaymentModal: false,
  };

  showListModal = () => {
    this.setState({
      showPaymentModal: true,
    })
  };

  closeListModal = () => {
    this.setState({
      showPaymentModal: false,
    })
  };

  showCreationModal = () => {
    this.setState({
      showListModal: false,
      showNewPaymentModal: true,
    })
  };

  closeCreationModal = () => {
    this.setState({
      showNewPaymentModal: false,
    })
  };

  render() {
    const { creditCards } = this.props;
    const { showPaymentModal, showNewPaymentModal } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <Section title="Payment Methods" mode="view" disabled={user.isDisabled} onEdit={this.showListModal} >
          {(creditCards && creditCards.length > 0) ?
            <React.Fragment>
              {creditCards.map(card => (
                <InfoSection key={`card_${card.id}`} creditCard={card.attributes} />
              ))}
            </React.Fragment>
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
