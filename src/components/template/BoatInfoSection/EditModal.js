import React from 'react';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

export default class EditBoatModal extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  setLocationFieldRef = (ref) => {
    this.locationFields = ref;
  }
  getLocationFieldInfo = () => {
    const {
      locationInfo: {
        locationType,
        name,
        city,
        state,
        street,
        zip,
      }
    } = this.props;
    const fields = [
      {
        type: 'select_box',
        field: 'locationType',
        label: 'Location Type',
        errorMessage: 'Select Location Type',
        required: true,
        defaultValue: locationType,
        options: [
          { value: 'marina', label: 'Marina' },
          { value: 'private_dock', label: 'Private Dock' },
          { value: 'dry_storage', label: 'Dry Storage' },
          { value: 'trailer', label: 'Trailer' },
          { value: 'residential_address', label: 'Rediential Address' },
          { value: 'business_address', label: 'Business Address' },
        ],
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'name',
        label: 'Location Name',
        errorMessage: 'Set Location Name',
        required: true,
        defaultValue: name,
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'dummy',
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'street',
        label: 'Address',
        errorMessage: 'Set Location Address',
        required: true,
        defaultValue: street,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      {
        type: 'text_field',
        field: 'city',
        label: 'City',
        errorMessage: 'Set City',
        required: true,
        defaultValue: city,
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'state',
        label: 'State',
        errorMessage: 'Set State',
        required: true,
        defaultValue: state,
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'zip',
        label: 'Zip',
        errorMessage: 'Set Zip',
        required: true,
        defaultValue: zip,
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
    ]
    return fields
  }
  getFormFieldInfo = () => {
    const {
      boatInfo: {
        name,
        make,
        model,
        year,
        length
      },
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
  onSave = () => {
    if (this.mainInfoFields.validateFields() && this.locationFields.validateFields()) {
      this.props.onSave({
        boat: this.mainInfoFields.getFieldValues(),
        location: this.locationFields.getFieldValues(),
      });
    }
  }
  render() {
    const fields = this.getFormFieldInfo();
    const locationFields = this.getLocationFieldInfo();
    const { open, onClose } = this.props;
    const action = [<HollowButton onClick={onClose}>Cancel</HollowButton>, <OrangeButton onClick={this.onSave}>Save</OrangeButton>];
    return (
      <Modal
        title="Edit Boat Information"
        actions={action}
        open={open}
        onClose={onClose}
      >
        <FormFields
          ref={this.setFormFieldRef}
          fields={fields}
        />
        <FormFields
          ref={this.setLocationFieldRef}
          fields={locationFields}
        />
      </Modal>
    );
  }
}
