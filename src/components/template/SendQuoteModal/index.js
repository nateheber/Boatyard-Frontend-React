import React from 'react';
import deepEqual from 'deep-equal';

import Modal from 'components/compound/Modal';

import QuoteTemplate from './QuoteTemplate';
import ActionFooter from './ActionFooter';

export default class SendQuoteModal extends React.Component {
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
    console.log(file);
  }
  
  render() {
    const { onClose, open } = this.props;
    const action = [ <ActionFooter onCancel={onClose} onSend={this.sendQuote} /> ];
    const { quote, body, subject } = this.state;
    return (
      <Modal
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