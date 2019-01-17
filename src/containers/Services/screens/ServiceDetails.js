import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import {
  get,
  set,
  findIndex,
  isEmpty,
  hasIn,
  camelCase,
  startCase
} from 'lodash';

import { ServiceEditor } from '../components/ServiceEditor';

import { updateServices, createServices } from 'reducers/services';
import { selectCategory } from 'reducers/categories';
import { setErrorState, resetErrorState } from 'reducers/appstate';

const getDefaultValue = (type, field, orgProperties) => {
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

const ucFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    const { services, categories, selectCategory } = props;
    const query = queryString.parse(props.location.search);
    const serviceId = query.service;
    let categoryId = get(categories, '[0].id', -1);
    if (serviceId) {
      const idx = findIndex(services, service => service.id === serviceId);
      const serviceDetail = services[idx];
      this.state = {
        ...serviceDetail
      };
      categoryId = serviceDetail.categoryId;
    } else {
      this.state = {
        name: '',
        categoryId: `${categoryId}`,
        cost: '',
        costType: null,
        description: '',
        isTaxable: false,
        properties: {},
        propertyFields: []
      };
    }
    selectCategory({ categoryId, callback: this.onReceiveCategory });
  }

  getOriginalServiceProperties = () => {
    const { services } = this.props;
    const query = queryString.parse(this.props.location.search);
    const serviceId = query.service;
    if (serviceId) {
      const serviceId = query.service;
      const idx = findIndex(services, service => service.id === serviceId);
      return get(services, `[${idx}].properties`, {});
    }
    return {};
  };
  getMainInputOptions = () => {
    const {
      name,
      categoryId,
      cost,
      costType,
      description,
      isTaxable
    } = this.state;
    const { categories } = this.props;
    const categoryOptions = categories.map(val => ({
      value: val.id,
      label: val.name
    }));

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
        lg: 6,
        xl: 6
      },
      {
        field: 'categoryId',
        label: 'Category',
        type: 'select_box',
        errorMessage: 'Select category',
        options: categoryOptions,
        required: true,
        defaultValue: `${categoryId}`,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
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
        lg: 6,
        xl: 6
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
        lg: 6,
        xl: 6
      },
      {
        field: 'description',
        label: 'Description',
        type: 'text_area',
        defaultValue: description,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'is_taxable',
        label: 'Taxable',
        type: 'check_box',
        defaultValue: isTaxable,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    ];
  };
  onChangeCategory = categoryId => {
    this.props.selectCategory({ categoryId, callback: this.onReceiveCategory });
  };
  onReceiveCategory = categoryInfo => {
    const { included } = categoryInfo;
    if (!isEmpty(included)) {
      const orgProperties = this.getOriginalServiceProperties();
      const properties = {};
      const propertyFields = included.map(field => {
        const { name, fieldType, required } = field.attributes;
        const fieldLabel = camelCase(name);
        const defVal = getDefaultValue(fieldType, fieldLabel, orgProperties);
        set(properties, name, defVal);
        const label = startCase(name);
        return {
          field: fieldLabel,
          label: ucFirst(label),
          type: fieldType,
          required,
          defaultValue: defVal,
          errorMessage: `${ucFirst(label)} is required`,
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        };
      });
      this.setState({
        properties,
        propertyFields
      });
    } else {
      this.setState({
        properties: {},
        propertyFields: []
      });
    }
  };
  onSave = (mainValues, properties) => {
    if (this.state.id) {
      this.props.updateServices({
        id: this.state.id,
        data: {
          ...mainValues,
          properties
        }
      }, () => this.props.history.push('/services/'));
    } else {
      this.props.createServices({
        provider_id: '34',
        ...mainValues,
        properties
      }, () => this.props.history.push('/services/'));
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    const mainFields = this.getMainInputOptions();
    const { propertyFields } = this.state;
    const { resetErrorState, setErrorState } = this.props;
    return (
      <ServiceEditor
        mainFields={mainFields}
        propertyFields={propertyFields}
        onChangeCategory={this.onChangeCategory}
        onCancel={this.onCancel}
        onSave={this.onSave}
        setErrorState={setErrorState}
        resetErrorState={resetErrorState}
      />
    );
  }
}

const mapStateToProps = ({
  service: { services },
  category: { categories, currentCategory }
}) => ({
  services,
  categories,
  currentCategory
});

const mapDispatchToProps = {
  updateServices,
  createServices,
  selectCategory,
  setErrorState,
  resetErrorState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
