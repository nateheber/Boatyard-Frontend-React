import React from 'react';

import { OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

export default class AddConfirmationModal extends React.Component {
  render() {
    const { open, onClose, onAddLocation } = this.props;
    const actions = [
      <OrangeButton onClick={onAddLocation} key="modal_btn_save">ADD LOCATION</OrangeButton>
    ];
    return (
      <Modal
        title="Add Location"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        
      </Modal>
    );
  }
}
