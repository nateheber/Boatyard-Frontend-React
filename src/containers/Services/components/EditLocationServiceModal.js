import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, isEmpty, camelCase, startCase, filter, hasIn } from 'lodash';

// import { actionTypes, GetCategories, GetCategory } from 'store/actions/categories';
import { actionTypes, GetService, GetAllServices } from 'store/actions/services';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

class EditLocationServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFields: this.getMainFields(),
      serviceValues: this.getServiceValues(),
      descriptionField: this.getDescriptionField()
    };
  }

  componentDidMount() {
    this.loadAllServices();
  }

  loadService = (serviceId) => {
    const { services } = this.props;
    const service = services.find(item => `${item.id}` === `${serviceId}`)
    const mainFields = this.getMainFields(service);
    const serviceValues = {}; //this.getServiceValuesFromCategory(included);
    const descriptionField = this.getDescriptionField(service);
    this.setState({ mainFields, serviceValues, descriptionField });  
  };

  loadAllServices = () => {
    const { GetAllServices } = this.props;
    const params = { page: 1, per_page: 1000 };
    GetAllServices({
      params,
      success: () => {
        const mainFields = this.getMainFields();
        this.setState({ mainFields });
      }
    });
  }

  getDescriptionField = () => {
    const { service } = this.props;
    return get(service, 'name');
  }

  getMainFields = (item) => {
    let { service: { name, serviceId, cost, costType, isTaxable } } = this.props;
    const services = get(this.props, 'services', []);
    const serviceOptions = services.map(val => ({
      value: val.id,
      label: startCase(val.name)
    }));
    if (!isEmpty(item)) {
      // name = get(item, 'name');
      serviceId = get(item, 'id');
      cost = get(item, 'cost');
      costType = get(item, 'costType');
      isTaxable = get(item, 'isTaxable');
    }
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
        className: 'primary',
        type: 'text_field',
        errorMessage: 'Enter the service name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 5,
        xl: 5
      },
      {
        field: 'service_id',
        label: 'Service',
        className: 'primary',
        type: 'select_box',
        errorMessage: 'Select service',
        options: serviceOptions,
        required: true,
        defaultValue: `${serviceId}`,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 5,
        xl: 5
      },
      {
        field: 'cost',
        label: 'Price',
        className: 'primary',
        type: 'currency_field',
        defaultValue: cost,
        placeholder: '$0.00',
        xs: 12,
        sm: 12,
        md: 6,
        lg: 5,
        xl: 5
      },
      {
        field: 'cost_type',
        label: 'Price Type',
        className: 'primary',
        type: 'select_box',
        options: priceTypes,
        defaultValue: costType,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 5,
        xl: 5
      },
      {
        field: 'is_taxable',
        label: 'Taxable',
        className: 'primary',
        type: 'check_box',
        defaultValue: isTaxable,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 2,
        xl: 2
      }
    ];
  };

  getServiceValuesFromCategory = (included) => {
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
      const fieldLabel = camelCase(name);
      serviceValues[fieldLabel] = this.getDefaultValue(fieldType, fieldLabel, {});
    }
    return serviceValues;
  };

  getServiceValues = () => {
    const { service, included } = this.props;
    const serviceId = get(service, 'serviceId');
    let serviceValues = {};
    const orgProperties = get(service, `properties`, {});;
    const services = get(included, 'services', []);
    if (!isEmpty(services)) {
      const item = get(services, serviceId, {});
      const fields = get(item, 'relationships.fields.data', []);
      const includedFields = get(included, 'service_fields', []);
      const refinedFields = [];
      for (const index in fields) {
        const field = fields[index];
        const filtered = filter(includedFields, item => !isEmpty(item) && item.id === field.id);
        if (!isEmpty(filtered)) {
          refinedFields.push({
            id: filtered[0].id,
            type: filtered[0].type,
            ...filtered[0].attributes
          });
        }
      }
      for (const index in refinedFields) {
        const field = refinedFields[index];
        const { name, fieldType } = field;
        const fieldLabel = camelCase(name);
        serviceValues[name] = this.getDefaultValue(fieldType, fieldLabel, orgProperties);
      }
    }
    return serviceValues;
  };

  getDefaultValue = (type, field, orgProperties) => {
    if (hasIn(orgProperties, field)) {
      return get(orgProperties, field);
    }
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


  getDescriptionField = (item) =>{
    let { service: { description } } = this.props;
    if (!isEmpty(item)) {
      description = get(item, 'description');  
    }
    return [
      {
        field: 'description',
        label: 'Description',
        className: 'primary',
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

  handleChange = (value, field) => {
    const { service } = this.props;
    if (field === 'service_id') {
      if (value['service_id'] === service.serviceId) {
        const serviceValues = this.getServiceValues();
        this.setState({ serviceValues });
      } else {
        this.loadService(value['service_id']);
      }
    }
  };

  onSave = () => {
    const { onSave } = this.props;
    // const { serviceValues } = this.state;
    if (this.mainFields.validateFields() && this.descriptionField.validateFields()) {
      let mainValues = {
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues(),
        // properties: serviceValues
      };
      mainValues = {
        ...mainValues,
        cost: mainValues.cost || '0'
      };
      onSave(mainValues);
    } else {
      toastr.clean();
      toastr.error('Please fill out all the required fields');
    }
  };

  setMainFieldsRef = ref => {
    this.mainFields = ref;
  };

  setDescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  render() {
    const { loading, open, onClose, onDelete, currentStatus, service } = this.props;
    const { mainFields, descriptionField } = this.state;
    const actions = [
      <HollowButton onClick={onDelete} key="modal_btn_cancel">Delete</HollowButton>,
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Update Service</OrangeButton>
    ];
    return (
      <Modal
        title={startCase(get(service, 'name'))}
        loading={loading || currentStatus === actionTypes.GET_CATEGORIES}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        { !isEmpty(mainFields) && <FormFields
          ref={this.setMainFieldsRef}
          fields={mainFields}
          onChange={this.handleChange}
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
  services: state.service.allServices,
  currentStatus: state.service.currentStatus,
  included: state.service.included,
  providerLocationId: state.auth.providerLocationId
});

const mapDispatchToProps = {
  GetService,
  GetAllServices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLocationServiceModal);
