import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import deepEqual from 'deep-equal';

import { OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import LoadingSpinner from 'components/basic/LoadingSpinner';

import {
  actionTypes,
  GetProviderLocations,
  CreateProviderLocation,
  UpdateProviderLocation,
} from 'store/actions/providerLocations';

import { getAddressInformation } from 'utils/location';

import { LocationImage } from './components';

const InfoSection = styled.div`
  padding: 15px 7px;
  &:first-child {
    margin-bottom: 25px;
    border-bottom: 1px solid #dfdfdf;
  }
`;

const ModalContent = styled.div`
  width: 382px;
  margin: auto;
`

class AddLocationModal extends React.Component {
  state = {
    image: '',
  }

  componentDidMount() {
    const { location } = this.props;
    const image = get(location, 'homeImage.url', '');
    this.setState({ image });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!deepEqual(prevProps.location, location)) {
      const image = get(location, 'homeImage.url', '');
      this.setState({ image });
    }
  }

  onChangeImage = (image) => {
    this.setState({ image });
  }

  onSuccess = () => {
    const { GetProviderLocations, onClose, providerId } = this.props;
    GetProviderLocations({ providerId });
    onClose();
  }

  getBasicInfoFields = () => {
    const { location } = this.props;
    if (location) {
      const { locationName } = getAddressInformation(location);
      const { contactName, contactEmail, contactPhone } = location;
      return [
        {
          field: 'locationName',
          label: 'Location Name',
          type: 'text_field',
          className: 'secondary',
          defaultValue: locationName,
          errorMessage: 'Enter location name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'contactName',
          label: 'Contact Name',
          type: 'text_field',
          className: 'secondary',
          defaultValue: contactName,
          errorMessage: 'Enter contact name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'phoneNumber',
          label: 'Phone',
          type: 'text_field',
          className: 'secondary',
          defaultValue: contactPhone,
          errorMessage: 'Enter the phone number',
          mask: '(999) 999-9999',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'email',
          label: 'Email',
          type: 'text_field',
          className: 'secondary',
          defaultValue: contactEmail,
          errorMessage: 'Enter email',
          required: true,
          xs: 12,
          md: 6,
        },
      ];
    } else {
      return [
        {
          field: 'locationName',
          label: 'Location Name',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter location name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'contactName',
          label: 'Contact Name',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter contact name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'phoneNumber',
          label: 'Phone',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter the phone number',
          mask: '(999) 999-9999',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'email',
          label: 'Email',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter email',
          required: true,
          xs: 12,
          md: 6,
        },
      ];
    }
  }

  getAddressFields = () => {
    const { location } = this.props;
    if (location) {
      const { street, city, state, zip } = getAddressInformation(location);
      return [
        {
          field: 'address',
          label: 'Address',
          type: 'text_field',
          className: 'secondary',
          defaultValue: street,
          errorMessage: 'Enter address',
          required: true,
          xs: 12,
        },
        {
          field: 'city',
          label: 'City',
          type: 'text_field',
          className: 'secondary',
          defaultValue: city,
          errorMessage: 'Enter city',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'state',
          label: 'State',
          type: 'text_field',
          className: 'secondary',
          defaultValue: state,
          errorMessage: 'Enter state',
          required: true,
          xs: 6,
          md: 3,
        },
        {
          field: 'zipCode',
          label: 'Zip Code',
          type: 'text_field',
          className: 'secondary',
          defaultValue: zip,
          errorMessage: 'Enter Zip Code',
          required: true,
          xs: 6,
          md: 3,
        },
      ];
    } else {
      return [
        {
          field: 'address',
          label: 'Address',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter address',
          required: true,
          xs: 12,
        },
        {
          field: 'city',
          label: 'City',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter city',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'state',
          label: 'State',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter state',
          required: true,
          xs: 6,
          md: 3,
        },
        {
          field: 'zipCode',
          label: 'Zip Code',
          type: 'text_field',
          className: 'secondary',
          errorMessage: 'Enter Zip Code',
          required: true,
          xs: 6,
          md: 3,
        },
      ]
    }
  }

  setBasicInfoRef = (ref) => {
    this.basicInfo = ref;
  }

  setAddressInfoRef = (ref) => {
    this.addressInfo = ref;
  }

  submitData = () => {
    const { location } = this.props;
    const isBasicInfoValid = this.basicInfo.validateFields();
    const isAddressInfoValid = this.addressInfo.validateFields();
    if (isBasicInfoValid && isAddressInfoValid) {
      const { locationName, contactName, phoneNumber, email } = this.basicInfo.getFieldValues();
      const { address, city, state, zipCode } = this.addressInfo.getFieldValues();
      const { image } = this.state;
      const data = {
        provider_location: {
          home_image: image,
          contact_name: contactName,
          contact_phone: phoneNumber,
          contact_email: email,
          location_attributes: {
            location_type: 'business_address',
            name: locationName,
            address_attributes: {
              street: address,
              city,
              state,
              zip: zipCode,
              country: 'USA'
            }
          }
        }
      };
      if (isEmpty(location)) {
        this.addLocation(data);
      } else {
        this.updateLocation(data);
      }
    }
  }

  addLocation = (data) => {
    const { providerId, CreateProviderLocation } = this.props;
    CreateProviderLocation({ providerId, data, success: this.onSuccess });
  }

  updateLocation = (data) => {
    const { providerId, location, UpdateProviderLocation } = this.props;
    const providerLocationId = get(location , 'id');
    UpdateProviderLocation({providerId, providerLocationId, data, success: this.onSuccess});
  }

  render() {
    const { open, onClose, currentStatus, location } = this.props;
    const { image } = this.state;
    const basicInfoFields = this.getBasicInfoFields();
    const addressFields = this.getAddressFields();
    const actionButtons = [
      <OrangeButton className="big thin-font" onClick={this.submitData} key="submit_data">
        {location ? 'Update Location' : 'Add Location'}
      </OrangeButton>
    ]
    return (
      <Modal
        title="Add Location"
        open={open}
        onClose={onClose}
        actions={actionButtons}
      >
        <ModalContent>
          <LocationImage image={image} onChange={this.onChangeImage} />
          <InfoSection>
            <FormFields fieldSize="big" fields={basicInfoFields} ref={this.setBasicInfoRef} />
          </InfoSection>
          <InfoSection>
            <FormFields fieldSize="big" fields={addressFields} ref={this.setAddressInfoRef} />
          </InfoSection>
        </ModalContent>
        { (currentStatus === actionTypes.CREATE_PROVIDER_LOCATION || currentStatus === actionTypes.UPDATE_PROVIDER_LOCATION) && (
          <LoadingSpinner loading={true} />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  currentStatus: state.providerLocation.currentStatus,
});

const mapDispatchToProps = {
  CreateProviderLocation,
  GetProviderLocations,
  UpdateProviderLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);