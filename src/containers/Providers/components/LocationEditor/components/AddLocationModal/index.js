import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { OrangeButton } from 'components/basic/Buttons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import LoadingSpinner from 'components/basic/LoadingSpinner';

import { actionTypes, GetProviderLocations, CreateProviderLocation } from 'store/actions/providerLocations';

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

  onChangeImage = (image) => {
    this.setState({ image });
  }

  onSuccess = () => {
    const { GetProviderLocations, onClose, providerId } = this.props;
    GetProviderLocations({ providerId });
    onClose();
  }

  getBasicInfoFields = () => {
    const { providerLocation } = this.props;
    if (providerLocation) {
      return [];
    } else {
      return [
        {
          field: 'locationName',
          label: 'Location Name',
          type: 'text_field',
          errorMessage: 'Enter location name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'contactName',
          label: 'Contact Name',
          type: 'text_field',
          errorMessage: 'Enter contact name',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'phoneNumber',
          label: 'Phone',
          type: 'text_field',
          errorMessage: 'Enter the phone number',
          mask: '(999)999-9999',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'email',
          label: 'Email',
          type: 'text_field',
          errorMessage: 'Enter email',
          required: true,
          xs: 12,
          md: 6,
        },
      ]
    }
  }

  getAddressFields = () => {
    const { providerLocation } = this.props;
    if (providerLocation) {
      return [];
    } else {
      return [
        {
          field: 'address',
          label: 'Address',
          type: 'text_field',
          errorMessage: 'Enter address',
          required: true,
          xs: 12,
        },
        {
          field: 'city',
          label: 'City',
          type: 'text_field',
          errorMessage: 'Enter city',
          required: true,
          xs: 12,
          md: 6,
        },
        {
          field: 'state',
          label: 'State',
          type: 'text_field',
          errorMessage: 'Enter state',
          required: true,
          xs: 6,
          md: 3,
        },
        {
          field: 'zipCode',
          label: 'Zip Code',
          type: 'text_field',
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
      this.addLocation(data);
    }
  }

  addLocation = (data) => {
    const { providerId, CreateProviderLocation } = this.props;
    CreateProviderLocation({ providerId, data, success: this.onSuccess });
  }

  render() {
    const { open, onClose, currentStatus } = this.props;
    const basicInfoFields = this.getBasicInfoFields();
    const addressFields = this.getAddressFields();
    const actionButtons = [
      <OrangeButton className="big thin-font" onClick={this.submitData} key="submit_data">
        Add Location
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
          <LocationImage onChange={this.onChangeImage} />
          <InfoSection>
            <FormFields fieldSize="big" fields={basicInfoFields} ref={this.setBasicInfoRef} />
          </InfoSection>
          <InfoSection>
            <FormFields fieldSize="big" fields={addressFields} ref={this.setAddressInfoRef} />
          </InfoSection>
        </ModalContent>
        { currentStatus === actionTypes.CREATE_PROVIDER_LOCATION && (
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
  GetProviderLocations
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);