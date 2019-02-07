import React from 'react';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';

import QuoteTemplate from './QuoteTemplate';

export default class SendQuoteModal extends React.Component {

  render() {
    const { onClose, open } = this.props;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Send Quote</OrangeButton>
    ];
    return (
      <Modal
        title="Send Quote"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <QuoteTemplate />       
      </Modal>
    );
  }
}