import React from 'react';
import styled from 'styled-components';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';

const Text = styled.div`
  text-align: left;
  line-height: 24px;
  font-size: 16px;
  color: #003247;
`;

export default class JobModalCloseConfirm extends React.Component {

  render() {
    const { open, onClose, onConfirm } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">DON'T SAVE</HollowButton>,
      <OrangeButton onClick={onConfirm} key="modal_btn_save">SAVE</OrangeButton>
    ];
    return (
      <Modal
        title="Are you sure?"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <Text>Please confirm that you would like to save this work order.</Text>
      </Modal>
    );
  }
}
