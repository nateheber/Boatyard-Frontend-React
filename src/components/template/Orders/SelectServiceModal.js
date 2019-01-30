import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';
import { get, set, isEmpty, filter, camelCase, startCase, hasIn } from 'lodash';

import { FilterServices, GetService } from 'store/actions/services';
import Modal from 'components/compound/Modal';
import { OrangeButton } from 'components/basic/Buttons';
import ProviderOption from 'components/basic/ProviderOption';
import ProviderOptionValue from 'components/basic/ProviderOptionValue';
import FormFields from 'components/template/FormFields';


const SubSectionTitle = styled.h5`
  text-transform: uppercase;
  color: #07384b;
  font-size: 12px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 0;
  margin-bottom: 5px;
`;

class SelectServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {},
      value: {},
      serviceFields: []
    };
  }

  componentDidMount() {
    this.props.FilterServices({ params: {} });
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
    });
  };

  getServiceFields = () => {
    const { service } = this.state;
    const { included } = this.props;
    const { categoryId } = service;
    const properties = {};
    const orgProperties = get(service, `properties`, {});;
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
          set(properties, name, defVal);
          const label = startCase(name);
          return {
            field: fieldLabel,
            label: label,
            type: fieldType,
            required,
            defaultValue: defVal,
            errorMessage: `${label} is required`,
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
            xl: 6
          };
        });
        this.setState({ serviceFields });
      }
    }
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
    this.serviceFields = ref;
  };

  next = () => {
    const { service } = this.state;
    this.props.toNext(service);
    this.props.onClose();
  };

  render() {
    const action = [<OrangeButton onClick={this.next} key="modal_action_button">CREATE ORDER</OrangeButton>];
    const { open, onClose } = this.props;
    const { serviceFields } = this.state;
    return (
      <Modal
        title="Create Order"
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
                <AsyncSelect
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
              <FormFields ref={this.setServiceFieldsRef} fields={serviceFields} />
            )}
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  filteredServices: state.service.filteredServices,
  included: state.service.included
});

const mapDispatchToProps = { FilterServices, GetService };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectServiceModal);
