import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, isEmpty, startCase } from 'lodash';

import { actionTypes, GetService, GetAllServices } from 'store/actions/services';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton } from 'components/basic/Buttons';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

class AddLocationServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFields: this.getMainFields(),
      serviceValues: {},
      descriptionField: this.getDescriptionFields()
    };
  }

  componentDidMount() {
    if (this.props.showCat) {
      this.loadServices();
    }
    // const { GetService, service } = this.props;
    // const serviceId = get(service, 'id');
    // GetService({ serviceId: serviceId, success: (service, included) => {
    //   const serviceValues = this.getServiceValues(included);
    //   this.setState({ serviceValues });
    // }});
  }

  loadServices = () => {
    const { GetAllServices } = this.props;
    GetAllServices({
      params: {
        page: 1,
        per_page: 1000,
        'service[order]': 'name',
        'service[sort]': 'asc'  
      },
      success: () => {
        const mainFields = this.getMainFields();
        this.setState({ mainFields });
      }
    });
  }

  getMainFields = () => {
    const { service, showCat } = this.props;
    const name = get(service, 'name');
    const cost = get(service, 'cost');
    const costType = get(service, 'costType');
    const isTaxable = get(service, 'isTaxable');
    const serviceId = get(service, 'id');
    console.log(this.props.service);

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
    if (!showCat) {
      return [
        {
          field: 'name',
          label: 'Service Name',
          className: 'primary',
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
          className: 'primary',
          type: 'currency_field',
          defaultValue: cost,
          placeholder: '$0.00',
          xs: 12,
          sm: 12,
          md: 6,
          lg: 3,
          xl: 3
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
          lg: 3,
          xl: 3
        },
        {
          field: 'is_taxable',
          label: 'Taxable',
          className: 'primary',
          type: 'check_box',
          defaultValue: isTaxable,
          xs: 12,
          sm: 12,
          md: 6,
          lg: 2,
          xl: 2
        }
      ];
    } else {
      const services = get(this.props, 'services', []);
      const serviceOptions = services.map(val => ({
        value: val.id,
        label: startCase(val.name)
      }));
      const defaultService = services.find(service => service.name === 'Miscellaneous');
      return [
        {
          field: 'name',
          label: 'Service Name',
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
          label: 'Service Type',
          className: 'primary',
          type: 'select_box',
          errorMessage: 'Select service',
          options: serviceOptions,
          required: true,
          defaultValue: `${defaultService.id || serviceId}`,
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
    }
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
    const { service } = this.props;
    const description = get(service, 'description');
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

  onSave = () => {
    console.log('location modal');
    const { service, onSave } = this.props;
    const { serviceValues } = this.state;
    if (this.mainFields.validateFields() && this.descriptionField.validateFields()) {
      let mainValues = {
        service_id: get(service, 'id'),
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues(),
        properties: serviceValues
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
    const { loading, open, onClose, currentStatus, service } = this.props;
    const { mainFields, descriptionField } = this.state;
    const actions = [
      <OrangeButton onClick={this.onSave} key="modal_btn_save">Add Service</OrangeButton>
    ];
    return (
      <Modal
        title={startCase(get(service, 'name'))}
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
  services: state.service.allServices,
  currentStatus: state.service.currentStatus,
  providerLocationId: state.auth.providerLocationId
});

const mapDispatchToProps = {
  GetService,
  GetAllServices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLocationServiceModal);
