import React from 'react';
import { connect } from 'react-redux';
import { get, isEmpty, merge } from 'lodash';

import { actionTypes } from 'store/actions/boats';
import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

const LOCATION_TYPES = [
  { value: 'marina', label: 'Marina' },
  { value: 'private_dock', label: 'Private Dock' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'dry_storage', label: 'Dry Storage' }
];

const BOAT_FIELDS = ['name', 'make', 'model', 'year', 'length', 'slip'];
const LOCATION_FIELDS = ['location_name', 'location_type'];
const ADDRESS_FILEDS = ['street', 'city', 'state', 'zip']

class BoatModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      optionalFields: [],
      fieldValues: {}
    };
  }

  componentDidMount() {

    this.getOptionalFields();
  }

  setMainFieldsRef = (ref) => {
    this.mainInfoFields = ref;
  };

  setOptionalFieldsRef = (ref) => {
    this.optionalFields = ref;
  };

  setLocationFieldsRef = (ref) => {
    this.locationFields = ref;
  };

  getMainFieldInfo = () => {
    const { boatInfo } = this.props;
    const fields = [
      {
        type: 'text_field',
        field: 'name',
        label: 'Name',
        errorMessage: 'Enter the boat name',
        required: true,
        defaultValue: get(boatInfo, 'name', ''),
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
        defaultValue: get(boatInfo, 'make', ''),
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
        defaultValue: get(boatInfo, 'model', ''),
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
        defaultValue: get(boatInfo, 'year', ''),
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
        defaultValue: get(boatInfo, 'length', ''),
        xs: 6,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
    ]
    return fields;
  };

  getOptionalFields = (locationType) => {
    const { boatInfo } = this.props;
    let boatLocation = get(boatInfo, 'location');
    if (isEmpty(boatLocation)) {
      boatLocation = get(boatInfo, 'relationships.location');
    }
    let slip = '', locationName = '';
    if (isEmpty(locationType)) {
      if (!isEmpty(boatInfo)) {
        locationType = get(boatLocation, 'attributes.locationType', '');
        locationName = get(boatLocation, 'attributes.name', '');
        slip = get(boatInfo, 'slip', '');
      } else {
        locationType = 'marina';
      }
    }

    const optionalFields = [
      {
        type: 'select_box',
        field: 'location_type',
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
    ];

    switch (locationType) {
      case 'marina': {
        optionalFields.push(
          {
            type: 'text_field',
            field: 'location_name',
            label: 'Marina Name',
            errorMessage: 'Set Marina Name',
            required: true,
            defaultValue: locationName,
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          }
        );
        optionalFields.push(
          {
            type: 'text_field',
            field: 'slip',
            label: 'Slip',
            errorMessage: 'Set Slip',
            required: true,
            defaultValue: slip,
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          },
        );
        break;
      }
      case 'dry_storage': {
        optionalFields.push(
          {
            type: 'text_field',
            field: 'location_name',
            label: 'Location Name',
            errorMessage: 'Set Location Name',
            required: true,
            defaultValue: locationName,
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4
          },
        );
        break;
      }
      default:
    }
    this.setState({ optionalFields });
  };

  getLocationFieldInfo = () => {
    const { boatInfo } = this.props;
    let boatLocation = get(boatInfo, 'location');
    if (isEmpty(boatLocation)) {
      boatLocation = get(boatInfo, 'relationships.location');
    }
    const locatoinValues = get(boatLocation, 'relationships.address.data', {});
    const fields = [
      {
        type: 'text_field',
        field: 'street',
        label: 'Address',
        errorMessage: 'Set Location Address',
        required: true,
        defaultValue: get(locatoinValues, 'street', ''),
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
        defaultValue: get(locatoinValues, 'city', ''),
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
        defaultValue: get(locatoinValues, 'state', ''),
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
        defaultValue: get(locatoinValues, 'zip', ''),
        xs: 4,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
    ];

    return fields;
  }

  getFormFieldInfo = () => {
  };

  onLocationTypeChange = (field, value) => {
    if (value === 'location_type') {
      this.getOptionalFields(field.location_type);
    }
  };

  onSave = () => {
    const { user } = this.props;
    let type = 'User';
    if (user.type === 'child_accounts') {
      type = 'ChildAccount';
    }
    if (this.mainInfoFields.validateFields() &&
    this.optionalFields.validateFields() &&
    this.locationFields.validateFields()) {
      const values = merge(
        this.mainInfoFields.getFieldValues(),
        this.optionalFields.getFieldValues(),
        this.locationFields.getFieldValues()
      );
      let boat = {};
      let locationAttrs = {};
      let addressAttrs = {};
      for(const key in values) {
        if (BOAT_FIELDS.indexOf(key) > -1) {
          boat[key] = values[key];
        } else if (LOCATION_FIELDS.indexOf(key) > -1) {
          if (key === 'location_name') {
            locationAttrs['name'] = values[key];
          } else {
            locationAttrs[key] = values[key];
          }
        } else if (ADDRESS_FILEDS.indexOf(key) > -1) {
          addressAttrs[key] = values[key];
        }
      }
      boat = {
        ...boat,
        location_attributes: {
          ...locationAttrs,
          locatable_type: type || 'ChildAccount',
          locatable_id: user.id,
          address_attributes: addressAttrs
        }
      };
      this.props.onSave({ boat });
    }
  }
  render() {
    const mainFields = this.getMainFieldInfo();
    const locationFields = this.getLocationFieldInfo();
    const { title, open, onClose, currentStatus } = this.props;
    const { optionalFields } = this.state;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={title || 'Boat Information'}
        loading={currentStatus === actionTypes.CREATE_BOAT || currentStatus === actionTypes.UPDATE_BOAT}
        actions={action}
        open={open}
        onClose={onClose}
      >
        <FormFields
          ref={this.setMainFieldsRef}
          fields={mainFields}
        />
        <FormFields
          ref={this.setOptionalFieldsRef}
          fields={optionalFields}
          onChange={this.onLocationTypeChange}
        />
        <div style={{ height: 15 }} />
        <FormFields
          ref={this.setLocationFieldsRef}
          fields={locationFields}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentStatus: state.boat.currentStatus
});

export default connect(mapStateToProps, null)(BoatModal);