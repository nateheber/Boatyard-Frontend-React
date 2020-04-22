import React from 'react';
import { connect } from 'react-redux';

import { HollowButton } from 'components/basic/Buttons';
import PaymentGatewayModal from 'components/template/CreditCardSection/PaymentGatewayModal';

class PaymentSettings extends React.Component {
  state = {
    showPaymentModal: false,
  }

  showGatewayModal = () => {
    this.setState({ showPaymentModal: true });
  }

  closeGatewayModal = () => {
    this.setState({ showPaymentModal: false });
  }

  render() {
    const { showPaymentModal } = this.state;
    const { privilege, providerId } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={this.showGatewayModal} style={{ margin: 0 }}>Connect Payment Gateway</HollowButton>
        <PaymentGatewayModal open={showPaymentModal} onClose={this.closeGatewayModal} privilege={privilege} providerId={providerId} />
      </React.Fragment>
    );
  }
}

export default connect(null, null)(PaymentSettings);