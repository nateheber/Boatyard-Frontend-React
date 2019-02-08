import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { get, merge, isEmpty, filter, camelCase, startCase, hasIn } from 'lodash';

import { FilterServices, GetService } from 'store/actions/services';
import { actionTypes } from 'store/actions/orders';
import Modal from 'components/compound/Modal';
import { OrangeButton } from 'components/basic/Buttons';
import ProviderOption from 'components/basic/ProviderOption';
import ProviderOptionValue from 'components/basic/ProviderOptionValue';
import FormFields from 'components/template/FormFields';
import { BoatyardSelect } from 'components/basic/Dropdown';


const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 0;
  margin-bottom: 5px;
`;

const orderFields = [
  {
    type: 'text_area',
    field: 'special_instructions',
    label: 'Special Instructions',
    errorMessage: 'Enter Special Instructions',
    required: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12
  }
];

class SelectServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {},
      value: {},
      boatFields: [],
      serviceFields: [],
    };
  }

  loadOptions = val => {
    return this.onChangeServiceFilter(val)
      .then((filtered) => {
        return filtered;
      }, () => {
        return [];
      });
  };

  onChangeServiceFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterServices({
        params: { 'search_by_name': val },
        success: resolve,
        error: reject
      });
    });
  };

  onChangeService = val => {
    this.setState({
      service: val
    }, () => {
      this.getServiceFields();
      this.getBoatFields();
    });
  };

  getServiceFields = () => {
    const { service } = this.state;
    const { included } = this.props;
    const { categoryId } = service;
    const orgProperties = {}; // get(service, `properties`, {});;
    if (categoryId) {
      const categories = get(included, 'categories', []);
      if (!isEmpty(categories)) {
        const category = get(categories, categoryId, {});
        const fields = get(category, 'relationships.fields.data', []);
        const includedFields = get(included, 'service_fields', []);
        const refinedFields = [];
        for (const index in fields) {
          const field = fields[index];
          const filtered = filter(includedFields, item => !isEmpty(item) && item.id === field.id);
          if (!isEmpty(filtered)) {
            refinedFields.push(filtered[0]);
          }
        }
        const serviceFields = refinedFields.map(field => {
          const { name, fieldType, required } = field.attributes;
          const fieldLabel = camelCase(name);
          const defVal = this.getDefaultValue(fieldType, fieldLabel, orgProperties);
          const label = startCase(name);
          let formField = {
            field: fieldLabel,
            label: label,
            type: fieldType,
            required,
            defaultValue: defVal,
            errorMessage: fieldType === 'select_box' ? `Choose ${label}` : `Enter ${label}`,
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
            xl: 6
          };
          if (fieldType === 'select_box') {
            const { collectionForSelect } = field.attributes;
            let options = collectionForSelect.map(option => {
              return {
                value: option,
                label: option
              };
            });
            options = [{ value: '', label: '' }].concat(options);
            formField['options'] = options;
          }
          return formField;
        });
        this.setState({ serviceFields });
      }
    }
  };

  getBoatFields = () => {
    const { boat } = this.props;
    const locationType = get(boat, 'relationships.location.attributes.locationType', '');
    const boatFields = [];
    if (locationType === 'marina') {
      const slip = get(boat, 'slip', '');
      boatFields.push({
        type: 'text_field',
        field: 'slipNumber',
        label: 'Slip Number',
        required: true,
        defaultValue: slip,
        errorMessage: 'Enter Slip Number',
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      });
    }
    this.setState({ boatFields });
  };

  getDefaultValue = (type, field, orgProperties) => {
    if (hasIn(orgProperties, field)) {
      return get(orgProperties, field);
    }
    switch (type) {
      case 'text_field':
        return '';
      case 'check_box':
        return false;
      case 'text_area':
        return '';
      case 'select_box':
        return 0;
      default:
        return '';
    }
  };

  setServiceFieldsRef = ref => {
    this.serviceForm = ref;
  };

  setBoatFieldsRef = ref => {
    this.boatForm = ref;
  };

  setOrderFieldsRef = ref => {
    this.orderForm = ref;
  };

  createOrder = () => {
    const { service } = this.state;
    let serviceValues = {}, orderValues = {}, boatValues = {};
    if ((this.serviceForm && !this.serviceForm.validateFields()) ||
    (this.orderForm && !this.orderForm.validateFields()) ||
    (this.boatForm && !this.boatForm.validateFields())) {
      return;
    }
    if (this.serviceForm) {
      serviceValues = this.serviceForm.getFieldValues();
    }
    if (this.boatForm) {
      boatValues = this.boatForm.getFieldValues();
    }
    if (this.orderForm) {
      orderValues = this.orderForm.getFieldValues();
    }
    orderValues = { ...orderValues, ...boatValues };
    this.props.toNext(service, serviceValues, orderValues);
  };

  render() {
    const { open, onClose, currentStatus } = this.props;
    const { service, serviceFields, boatFields } = this.state;
    const action = [
      <OrangeButton
        key="modal_action_button"
        onClick={this.createOrder}
        disabled={isEmpty(service)}
      >CREATE ORDER</OrangeButton>
    ];
    return (
      <Modal
        title="Create Order"
        loading={currentStatus === actionTypes.CREATE_ORDER}
        minHeight={265}
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Row>
          <Col sm={12} md={6}>
            <Row>
              <Col sm={12}><SubSectionTitle>SERVICE REQUESTED</SubSectionTitle></Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              <Col sm={12}>
                <BoatyardSelect
                  defaultOptions
                  components={{
                    Option: ProviderOption,
                    SingleValue: ProviderOptionValue
                  }}
                  loadOptions={this.loadOptions}
                  onChange={this.onChangeService}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {!isEmpty(serviceFields) && (
              <FormFields
                ref={this.setServiceFieldsRef}
                fields={serviceFields}
                onChange={this.handleServiceFieldChange}
              />
            )}
            {!isEmpty(service) && (
              <FormFields ref={this.setBoatFieldsRef} fields={boatFields} />
            )}
            {!isEmpty(service) && (
              <FormFields ref={this.setOrderFieldsRef} fields={orderFields} />
            )}
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentStatus: state.order.currentStatus,
  filteredServices: state.service.filteredServices,
  included: state.service.included
});

const mapDispatchToProps = { FilterServices, GetService };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectServiceModal);
