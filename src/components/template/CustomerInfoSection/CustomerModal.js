import React from 'react';
import { get } from 'lodash';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

const mainFields = ['first_name', 'last_name', 'phone_number', 'email', 'notes'];
const locationFields = ['street', 'city', 'state', 'zip'];
export default class CustomerModal extends React.Component {
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
        label: 'Phone Number',
        errorMessage: 'Enter Phone Number',
        mask: '(999)999-9999',
        required: true,
        defaultValue: phoneNumber,
        xs: 12,
        sm: 12,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'street',
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
      this.props.onSave({ user });
    }
  }

  
  render() {
    const fields = this.getFormFieldInfo();
    const { title, open, onClose, loading } = this.props;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={title || 'Add Customer'}
        loading={loading}
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
