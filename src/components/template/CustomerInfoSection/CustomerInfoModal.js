import React from 'react';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

export default class EditBoatModal extends React.Component {
  setFormFieldRef = (ref) => {
    this.mainInfoFields = ref;
  }
  getFormFieldInfo = () => {
    const {
      customerInfo: {
        firstName,
        lastName,
        phoneNumber,
        email,
      }
    } = this.props;
    const fields = [
      {
        type: 'text_field',
        field: 'firstName',
        label: 'First Name',
        errorMessage: 'Enter the first name',
        required: true,
        defaultValue: firstName,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'lastName',
        label: 'Last Name',
        errorMessage: 'Enter the last name',
        required: true,
        defaultValue: lastName,
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'phoneNumber',
        label: 'Phone Number',
        errorMessage: 'Enter the phone number',
        required: true,
        defaultValue: phoneNumber,
        mask: '(999) 999-9999',
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'email',
        label: 'Email',
        errorMessage: 'Enter the email',
        required: true,
        defaultValue: email,
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
    if (this.mainInfoFields.validateFields()) {
      this.props.onSave(this.mainInfoFields.getFieldValues());
    }
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
        title="Edit Customer Information"
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
