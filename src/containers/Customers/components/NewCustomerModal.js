import React from 'react';
import { connect } from 'react-redux'

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';

import { createUsers } from 'reducers/users';

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
        errorMessage: 'Enter the first name',
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
        errorMessage: 'Enter the last name',
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
        label: 'PHONE NUMBER',
        errorMessage: 'Enter the phone number',
        mask: '(999)999-9999',
        required: true,
        xs: 12,
        sm: 12,
        md: 3,
        lg: 3,
        xl: 3
      },
    ]
    return fields;
  }
  onSave = () => {
    if (this.mainInfoFields.validateFields()) {
      this.props.createUsers(this.mainInfoFields.getFieldValues);
    }
    this.props.onClose();
  }
  render() {
    const fields = this.getFormFieldInfo();
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
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  createUsers
}

export default connect(null, mapDispatchToProps)(NewCustomer)