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

export default class AssignConfirmModal extends React.Component {


  render() {
    const { open, onClose, onConfirm, selected, selectedName } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={onConfirm} key="modal_btn_save">{!selected ? 'CONFIRM' : 'SEND'}</OrangeButton>
    ];
    return (
      <Modal
        title="Are you sure?"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        {!selected ? (
            <Text>Please confirm that you would like to remove assignee from this order.</Text>
          ) : (
            <Text>Please confirm that you would like to assign this order to {selectedName}.</Text>
          )
        }
      </Modal>
    );
  }
}
