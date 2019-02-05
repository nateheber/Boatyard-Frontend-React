import React from 'react';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

export default class AddServiceModal extends React.Component {
  getMainFields = () => {
    const { service } = this.props;
    const name = get(service, 'name');

    const priceTypes = [
      {
        value: null,
        label: 'None'
      },
      {
        value: 'Length',
        label: 'Length'
      },
      {
        value: 'Gallons',
        label: 'Gallons'
      },
      {
        value: 'Hour',
        label: 'Hour'
      },
      {
        value: 'Quantity',
        label: 'Quantity'
      }
    ];

    return [
      {
        field: 'name',
        label: 'Name',
        type: 'text_field',
        errorMessage: 'Enter the service name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 4
      },
      {
        field: 'cost',
        label: 'Price',
        type: 'text_field',
        defaultValue: '',
        placeholder: 'e.g., 35.00',
        xs: 12,
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      },
      {
        field: 'cost_type',
        label: 'Price Type',
        type: 'select_box',
        options: priceTypes,
        defaultValue: null,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      },
      {
        field: 'is_taxable',
        label: 'Taxable',
        type: 'check_box',
        defaultValue: false,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 2,
        xl: 2
      },
      {
        field: 'description',
        label: 'Description',
        type: 'text_area',
        defaultValue: '',
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    ];
  };

  onSave = () => {
    if (this.mainFields.validateFields()) {
      const mainFieldValues = this.mainFields.getFieldValues();
      this.props.onSave(mainFieldValues);
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setAdditinalFieldsRef = ref => {
    this.additinalFields = ref;
  };

  render() {
    const { title, open, loading, onClose } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={title}
        loading={loading}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <FormFields
          ref={this.setMainFieldsRef}
          fields={this.getMainFields()}
        />
        {/* <FormFields
          ref={this.setAdditinalFieldsRef}
          fields={additinalFields}
        /> */}
      </Modal>
    );
  }
}
