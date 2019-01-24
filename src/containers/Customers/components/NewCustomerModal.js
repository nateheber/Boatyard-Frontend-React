import React from 'react';
import { connect } from 'react-redux'

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

import { CreateUser } from 'store/actions/users';

class NewCustomer extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  getFormFieldInfo = () => {
    const fields = [
      {
        type: 'text_field',
        field: 'firstName',
        label: 'First Name',
        errorMessage: 'Enter Lirst Name',
        required: true,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        type: 'text_field',
        field: 'lastName',
        label: 'Last Name',
        errorMessage: 'Enter Last Name',
        required: true,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'phoneNumber',
        label: 'Phone Number',
        errorMessage: 'Enter Phone Number',
        mask: '(999)999-9999',
        required: true,
        xs: 12,
        sm: 12,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'billingAddress',
        label: 'Billing Address',
        errorMessage: 'Enter Billing Address',
        required: true,
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
        required: true,
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
        required: true,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'zipCode',
        label: 'Zip Code',
        errorMessage: 'Enter Zipcode',
        required: true,
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
      this.props.CreateUser(this.mainInfoFields.getFieldValues);
    }
    // this.props.onClose();
  }
  render() {
    const fields = this.getFormFieldInfo();
    const { open, onClose } = this.props;
    const action = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title="Add Customer"
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

const mapDispatchToProps = {
  CreateUser
}

export default connect(null, mapDispatchToProps)(NewCustomer)