import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, isEmpty, camelCase, startCase, orderBy } from 'lodash';

import { actionTypes, GetCategory } from 'store/actions/categories';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

class AddServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFields: this.getMainFields(),
      serviceFields: [],
      descriptionField: this.getDescriptionFields()
    };
  }

  componentDidMount() {
    const { GetCategory } = this.props;
    const categoryId = this.getCategoryId();
    GetCategory({ categoryId: categoryId, success: (category, included) => {
      const serviceFields = this.getServiceFields(included);
      this.setState({ serviceFields });
    }});

  }

  getCategoryId = () => {
    const { service, category } = this.props;
    let categoryId = get(category, 'id');
    if (isEmpty(categoryId)) {
      categoryId = get(service, 'categoryId');
    }
    return categoryId;
  };

  getServiceName = () => {
    const { service, category } = this.props;
    let name = get(category, 'name');
    if (isEmpty(name)) {
      name = get(service, 'name');
    }
    return name;
  }

  getMainFields = () => {
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
        defaultValue: this.getServiceName(),
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
      }
    ];
  };

  getServiceFields = (included) => {
    let refinedFields = [];
    for (const index in included) {
      const field = included[index];
      refinedFields.push({
        id: field.id,
        type: field.type,
        ...field.attributes
      });
    }
    refinedFields = orderBy(refinedFields, ['position'], ['asc']);
    const serviceFields = refinedFields.map(field => {
      const { name, fieldType, required, placeholder } = field;
      const fieldLabel = camelCase(name);
      const label = startCase(name);
      return {
        field: fieldLabel,
        label: label,
        type: fieldType,
        required,
        placeholder: placeholder || '',
        defaultValue: '',
        errorMessage: `Enter ${label}`,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      };
    });
    return serviceFields;
  };

  getDescriptionFields = () =>{
    return [
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
  }

  onSave = () => {
    const { serviceFields } = this.state;
    const { onSave } = this.props;
    if (this.mainFields.validateFields() &&
      (isEmpty(serviceFields) ||
      (!isEmpty(serviceFields) && this.serviceFields.validateFields()))) {
      const mainValues = {
        categoryId: this.getCategoryId(),
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      if (!isEmpty(serviceFields)) {
        onSave({
          ...mainValues,
          properties: this.serviceFields.getFieldValues()
        });
      } else {
        onSave(mainValues);
      }
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setServiceFieldsRef = ref => {
    this.serviceFields = ref;
  };

  setdescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { loading, open, onClose, currentStatus } = this.props;
    const { mainFields, serviceFields, descriptionField } = this.state;
    const actions = [
      <HollowButton onClick={onClose} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>
    ];
    return (
      <Modal
        title={this.getServiceName()}
        loading={loading || currentStatus === actionTypes.GET_CATEGORY}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        { !isEmpty(mainFields) && <FormFields
          ref={this.setMainFieldsRef}
          fields={this.getMainFields()}
        />}
        { !isEmpty(serviceFields) && <FormFields
          ref={this.setServiceFieldsRef}
          fields={serviceFields}
        />}
        <Divider />
        { !isEmpty(descriptionField) && <FormFields
          ref={this.setdescriptionFieldRef}
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
