import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { formatPhoneNumber } from 'utils/basic';
import ExternalCustomerSearch from './ExternalCustomerSearch';

const mainFields = ['first_name', 'last_name', 'phone_number', 'email', 'notes'];
const locationFields = ['street', 'city', 'state', 'zip'];

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-weight: bold;
`;
const SearchContainer = styled.div`
  flex-grow: 1;
  margin: 0 30px;
`;

export default class CustomerModal extends React.Component {
  state = {
    externalBoats: [],
    customerId: ''
  }

  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  getFormFieldInfo = () => {
    const customerInfo = get(this.props, 'customerInfo', {});
    const {
      firstName,
      lastName,
      phoneNumber,
      billingAddress,
      city,
      state,
      zipcode,
      email,
      notes
    } = customerInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'first_name',
        className: 'primary',
        label: 'First Name',
        errorMessage: 'Enter First Name',
        required: true,
        defaultValue: firstName,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        type: 'text_field',
        field: 'last_name',
        className: 'primary',
        label: 'Last Name',
        errorMessage: 'Enter Last Name',
        required: true,
        defaultValue: lastName,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'phone_number',
        className: 'primary',
        label: 'Phone Number',
        errorMessage: 'Enter Phone Number',
        mask: '(999) 999-9999',
        required: true,
        defaultValue: formatPhoneNumber(phoneNumber),
        xs: 12,
        sm: 12,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'street',
        className: 'primary',
        label: 'Billing Address',
        errorMessage: 'Enter Billing Address',
        defaultValue: billingAddress,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      {
        type: 'text_field',
        field: 'city',
        className: 'primary',
        label: 'City',
        errorMessage: 'Enter City',
        defaultValue: city,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        type: 'text_field',
        field: 'state',
        className: 'primary',
        label: 'State',
        errorMessage: 'Enter State',
        defaultValue: state,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'zip',
        className: 'primary',
        label: 'Zip Code',
        errorMessage: 'Enter Zipcode',
        defaultValue: zipcode,
        xs: 12,
        sm: 12,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'email',
        className: 'primary',
        label: 'Email',
        errorMessage: 'Enter the email',
        required: true,
        defaultValue: email,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        type: 'text_area',
        field: 'notes',
        className: 'primary',
        label: 'Customer Notes',
        errorMessage: 'Enter the notes',
        required: false,
        defaultValue: notes,
        xs: 12,
        sm: 12,
        md: 7,
        lg: 7,
        xl: 7
      }
    ]
    return fields;
  }

  onSave = () => {
    if (this.mainInfoFields.validateFields()) {
      const values = this.mainInfoFields.getFieldValues();
      let user = {};
      const address_attributes = {}
      for (const key in values) {
        const value = get(values, key, '');
        if(mainFields.indexOf(key) > -1) {
          user[key] = value;
        } else if (locationFields.indexOf(key) > -1) {
          address_attributes[key] = value;
        }
      }
      if (address_attributes.street.trim().length > 0 ||
        address_attributes.city.trim().length > 0 ||
        address_attributes.state.trim().length > 0 ||
        address_attributes.zip.trim().length > 0) {
          user = {
            ...user,
            locations_attributes: [
              {
                name: 'Home Address',
                location_type: 'residential_address',
                address_attributes
              }
            ]
          };
        }
      const { externalBoats } = this.state;
      if (this.state.customerId) {
        user.customer_id = this.state.customerId;
      }
      this.props.onSave({ user, externalBoats });
    }
  }

  onExternalCustomerSelected = (customerInfo) => {
    if (customerInfo) {
      const { state: {value} } = this.mainInfoFields;
      const newValue = {...value, 
        first_name: customerInfo.firstName, 
        last_name: customerInfo.lastName,
        phone_number: customerInfo.homePhoneNo,
        email: customerInfo.emailAddress ? customerInfo.emailAddress.toLowerCase() : undefined
      };
      this.mainInfoFields.setState({value: newValue});
      let externalBoats = get(customerInfo, 'customerBoats.customerBoat', []);
      externalBoats = Array.isArray(externalBoats) ? externalBoats : [externalBoats];
      this.setState({customerId: customerInfo.customerId, externalBoats});
    }
  }

  render() {
    const fields = this.getFormFieldInfo();
    const { title, open, onClose, loading } = this.props;
    // const {showAdditionalFields } = this.props;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    const headers = (
      <ModalHeader>
        <Title>{title || 'Add Customer'}</Title>
        <SearchContainer>
            <ExternalCustomerSearch onExternalCustomerSelected={this.onExternalCustomerSelected} />
          </SearchContainer>
        {/* { showAdditionalFields && 
          <SearchContainer>
            <ExternalCustomerSearch onExternalCustomerSelected={this.onExternalCustomerSelected} />
          </SearchContainer>
        } */}
      </ModalHeader>
    );
    return (
      <Modal
        loading={loading}
        actions={action}
        open={open}
        onClose={onClose}
        customHeader={headers}
      >
        <FormFields
          ref={this.setFormFieldRef}
          fields={fields}
        />
      </Modal>
    );
  }
}
