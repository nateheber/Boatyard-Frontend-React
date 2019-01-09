import React from 'react';
import { connect } from 'react-redux';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

export default class EditBoatModal extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  getFormFieldInfo = () => {
    const {
      boatInfo: {
        name,
        make,
        model,
        year,
        length
      }
    } = this.props;
    const fields = [
      {
        type: 'text_field',
        field: 'name',
        label: 'Name',
        errorMessage: 'Enter the boat name',
        required: true,
        defaultValue: name,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'make',
        label: 'Make',
        errorMessage: 'Enter the boat make',
        required: true,
        defaultValue: make,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'model',
        label: 'Boat Model',
        errorMessage: 'Enter the boat model',
        required: true,
        defaultValue: model,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'year',
        label: 'Year',
        errorMessage: 'Enter the boat year',
        required: true,
        defaultValue: year,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'length',
        label: 'Length',
        defaultValue: length,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
    ]
    return fields;
  }
  render() {
    const fields = this.getFormFieldInfo();
    const { open, onClose, onSave } = this.props;
    const action = [<HollowButton onClick={onClose}>Cancel</HollowButton>, <OrangeButton onClick={onSave}>Save</OrangeButton>];
    return (
      <Modal
        title="Select Customer"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <FormFields
          ref={this.setFormFieldRef}
          fields={fields}
        />
      </Modal>
    );
  }
}
