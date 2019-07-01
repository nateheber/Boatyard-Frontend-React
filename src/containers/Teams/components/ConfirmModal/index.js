import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';

const Text = styled.div`
  text-align: left;
  line-height: 24px;
  font-size: 16px;
  color: #003247;
`;

export default class ConfirmModal extends React.Component {
  getName = () => {
    const { locations } = this.props;
    if (locations) {
      const names = locations.map(location => get(location, 'relationships.locations.attributes.name'));
      if (names.length > 2) {
        const prefNames = names.slice(0, names.length - 1);
        return `${prefNames.join(', ')} and ${names[names.length - 1]}`;
      } else if (names.length === 2) {
        return names.join(' and ');
      } else {
        return names.join('');
      }
    }
    return '';
  };

  render() {
    const { open, onClose, onConfirm, locations } = this.props;
    const names = this.getName();
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={onConfirm} key="modal_btn_save">CONFIRM</OrangeButton>
    ];
    return (
      <Modal
        title="Are you sure?"
        actions={actions}
        open={open}
        onClose={onClose}
      >
        {(locations && locations.length === 0) ? (
            <Text>Please confirm that you would like to remove all locations from this team member.</Text>
          ) : (
            <Text>Please confirm that you would like to grant access to {names} to this team member.</Text>
          )
        }
      </Modal>
    );
  }
}
