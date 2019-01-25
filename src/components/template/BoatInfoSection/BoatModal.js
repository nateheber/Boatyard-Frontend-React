import React from 'react';
import { get } from 'lodash';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

const LOCATION_TYPES = [
  { value: 'marina', label: 'Marina' },
  { value: 'private_dock', label: 'Private Dock' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'dry_storage', label: 'Dry Storage' }
];

export default class BoatModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mainFields: [],
      locationFields: []
    };
  }

  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  setLocationFieldRef = (ref) => {
    this.locationFields = ref;
  }

  getAdditionalFields = (locationType, defaultValues = {}) => {
    switch (locationType) {
      case 'marina': {
        return [
          {
            type: 'text_field',
            field: 'location_name',
            label: 'Marina Name',
            errorMessage: 'Set Marina Name',
            required: true,
            defaultValue: get(defaultValues, 'name', ''),
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          },
          {
            type: 'text_field',
            field: 'slip',
            label: 'Slip',
            errorMessage: 'Set Slip',
            required: true,
            defaultValue: get(defaultValues, 'slip', ''),
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          },
        ];
      }
      case 'dry_storage': {
        return [
          {
            type: 'text_field',
            field: 'location_name',
            label: 'Location Name',
            errorMessage: 'Set Location Name',
            required: true,
            defaultValue: get(defaultValues, 'locationName', ''),
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          },
        ];
      }
      default: {
        return [];
      }
    }
  };

  onLocationTypeChange = (field, value) => {
    if (value === 'locationType') {
      console.log('-------LocationFields-----------', field, this.locationFields.getFieldValues());
    }
  };

  getLocationFieldInfo = (locationInfo = {}) => {
    const {
      locationType,
      city,
      state,
      street,
      zip
    } = locationInfo;
    const fields = [
      {
        type: 'select_box',
        field: 'locationType',
        label: 'Boat Location',
        errorMessage: 'Select Location Type',
        required: true,
        defaultValue: locationType,
        options: LOCATION_TYPES,
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
    ];
    this.getAdditionalFields(locationType || 'marina', locationInfo).map((field, index) => {
      fields.splice(1 + index, 0, field);
    });
    return fields;
  }
  getFormFieldInfo = () => {
    const boatInfo = get(this.props, 'boatInfo', {});
    const {
      name,
      make,
      model,
      year,
      length
    } = boatInfo;
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
        mask: '9999',
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
        label: 'Boat Length',
        defaultValue: length,
        xs: 6,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
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
    const { title, open, onClose } = this.props;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={title || 'Boat Information'}
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
          onChange={this.onLocationTypeChange}
        />
      </Modal>
    );
  }
}
