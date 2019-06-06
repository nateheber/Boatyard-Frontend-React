import React from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';

import Modal from 'components/compound/Modal';

import QuoteTemplate from './QuoteTemplate';
import ActionFooter from './ActionFooter';

class SendQuoteModal extends React.Component {
  constructor(props) {
    super(props);
    const { subject, quote, body } = props;
    this.state = { subject, quote, body }
  }

  componentDidUpdate(props) {
    if (!deepEqual(this.props, props)) {
      const { subject, quote, body } = this.props;
      this.setState({ subject, quote, body });
    }
  }

  sendQuote = (file) => {
    this.props.onSendQuote();
  }
  
  render() {
    const { onClose, open, loading } = this.props;
    const action = [ <ActionFooter onCancel={onClose} onSend={this.sendQuote} key="action_footer" /> ];
    const { quote, body, subject } = this.state;
    return (
      <Modal
        loading={loading}
        title="Send Quote"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <QuoteTemplate subject={subject} quote={quote} body={body} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  provider: state.provider.loggedInProvider
})

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendQuoteModal);
