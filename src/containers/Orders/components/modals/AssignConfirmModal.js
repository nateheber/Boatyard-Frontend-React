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
  getName = () => {
    const { assignees } = this.props;
    if (assignees) {
      assignees.map(assignee => assignee.name);
    }
    return '';
  };

  render() {
    const { open, onClose, onConfirm, assignees } = this.props;
    const names = this.getName();
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={onConfirm} key="modal_btn_save">{(assignees && assignees.length === 0) ? 'CONFIRM' : 'SEND'}</OrangeButton>
    ];
    return (
      <Modal
        title="Are you sure?"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        {(assignees && assignees.length === 0) ? (
            <Text>Please confirm that you would like to remove all assignees from this order.</Text>
          ) : (
            <Text>Please confirm that you would like to dispatch this order to {names}.</Text>
          )
        }
      </Modal>
    );
  }
}
