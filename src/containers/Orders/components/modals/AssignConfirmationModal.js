import React from 'react';
import styled from 'styled-components';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';

const Text = styled.div`
  text-align: center;
  font-size: 21px;
  color: #003247;
  margin-bottom: 20px;
`

export default class AssignConfirmModal extends React.Component {
  render() {
    const { open, onClose, onConfirm, count } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={onConfirm} key="modal_btn_save">SAVE</OrangeButton>
    ];
    return (
      <Modal
        title="Are you sure?"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <Text>You are dispatching account to {count} providers</Text>
      </Modal>
    );
  }
}
