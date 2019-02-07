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

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFields: [],
      descriptionField: []
    };
  }



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

  getCategoryFields = () => {

    const name = '';
    const cost = '';
    const costType = '';
    const isTaxable = false;
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
    
    const categoryFields = [
      {
        field: 'name',
        label: 'Name',
        type: 'text_field',
        errorMessage: 'Enter Category name',
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
        required: false,
        defaultValue: cost,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 4
      },
      {
        field: 'cost_type',
        label: 'Price Type',
        type: 'select_box',
        options: priceTypes,
        defaultValue: costType,
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
        defaultValue: isTaxable,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 2,
        xl: 2
      }
    ];

    this.setState({ categoryFields });
  };

  getDescriptionField = () => {
    const description = '';
    const descriptionField = [
      {
        field: 'description',
        label: 'Description',
        type: 'text_area',
        defaultValue: description,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    ];

    this.setState({ descriptionField });
  };

  setCategoryFieldsRef = ref => {
    this.categoryFields = ref;
  };

  setDescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { loading, title, open, onClose } = this.props;
    const { categoryFields, descriptionField } = this.state;
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
)(CategoryModal);
