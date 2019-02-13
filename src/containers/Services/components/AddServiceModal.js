import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, isEmpty, startCase } from 'lodash';

import { actionTypes, GetCategory } from 'store/actions/categories';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton } from 'components/basic/Buttons';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

class AddServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFields: this.getMainFields(),
      serviceValues: {},
      descriptionField: this.getDescriptionFields()
    };
  }

  componentDidMount() {
    const { GetCategory, category } = this.props;
    const categoryId = get(category, 'id');
    GetCategory({ categoryId: categoryId, success: (category, included) => {
      const serviceValues = this.getServiceValues(included);
      this.setState({ serviceValues });
    }});

  }

  getMainFields = () => {
    const { category } = this.props;
    const name = get(category, 'name');
    const cost = get(category, 'cost');
    const costType = get(category, 'costType');
    const isTaxable = get(category, 'isTaxable');
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
        defaultValue: cost,
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
  };

  getServiceValues = (included) => {
    let refinedFields = [];
    let serviceValues = {};
    for (const index in included) {
      const field = included[index];
      refinedFields.push({
        id: field.id,
        type: field.type,
        ...field.attributes
      });
    }
    for (const index in refinedFields) {
      const field = refinedFields[index];
      const { name, fieldType } = field;
      serviceValues[name] = this.getDefaultValue(fieldType);
    }
    return serviceValues;
  };

  getDefaultValue = (type) => {
    switch (type) {
      case 'text_field':
        return 'none';
      case 'check_box':
        return false;
      case 'text_area':
        return 'none';
      case 'select_box':
        return 0;
      default:
        return 'none';
    }
  };

  getDescriptionFields = () =>{
    const { category } = this.props;
    const description = get(category, 'description');
    return [
      {
        field: 'description',
        label: 'Description',
        type: 'text_area',
        required: false,
        defaultValue: description,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    ];
  }

  onSave = () => {
    const { category, onSave } = this.props;
    const { serviceValues } = this.state;
    if (this.mainFields.validateFields() && this.descriptionField.validateFields()) {
      const mainValues = {
        category_id: get(category, 'id'),
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues(),
        properties: serviceValues
      };
      onSave(mainValues);
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setDescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { loading, open, onClose, currentStatus, category } = this.props;
    const { mainFields, descriptionField } = this.state;
    const actions = [
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Add Service</OrangeButton>
    ];
    return (
      <Modal
        title={startCase(get(category, 'name'))}
        loading={loading || currentStatus === actionTypes.GET_CATEGORY}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        { !isEmpty(mainFields) && <FormFields
          ref={this.setMainFieldsRef}
          fields={this.getMainFields()}
        />}
        <Divider />
        { !isEmpty(descriptionField) && <FormFields
          ref={this.setDescriptionFieldRef}
          fields={descriptionField}
        />}
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
)(AddServiceModal);
