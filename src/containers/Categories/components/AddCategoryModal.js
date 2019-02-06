import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';

import { GetCategory } from 'store/actions/categories';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

const categoryFields = [
  {
    field: 'name',
    label: 'Name',
    type: 'text_field',
    errorMessage: 'Enter Category name',
    required: true,
    defaultValue: '',
    xs: 12,
    sm: 12,
    md: 6,
    lg: 4,
    xl: 4
  },
  {
    field: 'app_identifier',
    label: 'App Identifier',
    type: 'text_field',
    required: false,
    defaultValue: '',
    xs: 12,
    sm: 12,
    md: 6,
    lg: 4,
    xl: 4
  },
  {
    field: 'is_hidden',
    label: 'Hidden',
    type: 'check_box',
    defaultValue: false,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 2,
    xl: 2
  },
  {
    field: 'primary',
    label: 'Primary',
    type: 'check_box',
    defaultValue: false,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 2,
    xl: 2
  },
  {
    field: 'subtitle',
    label: 'Sub Title',
    type: 'text_field',
    defaultValue: '',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12
  }
];

const descriptionField = [
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

class AddCategoryModal extends React.Component {
  onSave = () => {
    const { onSave } = this.props;
    if (this.categoryFields.validateFields()) {
      const values = {
        ...this.categoryFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      onSave(values);
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  setCategoryFieldsRef = ref => {
    this.categoryFields = ref;
  };

  setDescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { loading, title, open, onClose } = this.props;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={title || 'New Category'}
        loading={loading}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <FormFields
          ref={this.setCategoryFieldsRef}
          fields={categoryFields}
        />
        <Divider />
        <FormFields
          ref={this.setDescriptionFieldRef}
          fields={descriptionField}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.category.currentStatus
});

const mapDispatchToProps = {
  GetCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryModal);
