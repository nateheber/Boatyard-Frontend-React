import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { get, filter, camelCase, isEmpty, startCase, isNumber, hasIn, orderBy } from 'lodash';

import { actionTypes as serviceActions, GetService, UpdateService } from 'store/actions/services';
import { GetCategories, GetCategory } from 'store/actions/categories';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import FormFields from 'components/template/FormFields';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;


class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: '',
      service: {},
      included: [],
      mainFields: [],
      serviceFields: [],
      descriptionField: []
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    this.setState({
      serviceId: query.service
    }, () => {
      this.loadService();
      this.loadCategories();
    })
  }

  loadService = () => {
    const { GetService } = this.props;
    const { serviceId } = this.state;
    GetService({ serviceId, success: (service, included) => {
      const mainFields = this.getMainFields(service);
      this.setState({ service, included });
      const serviceFields = this.getServiceFields(service, included);
      const descriptionField = this.getDescriptionFields(service);
      this.setState({
        mainFields,
        serviceFields,
        descriptionField
      });
    }});
  };

  loadCategory = (categoryId) => {
    const { GetCategory } = this.props;
    GetCategory({
      categoryId,
      success: (category, included) => {
        const serviceFields = this.getServiceFieldsFromCategory(included);
        this.setState({ serviceFields });
      }
    })
  };

  loadCategories = () => {
    const { GetCategories } = this.props;
    const params = {
      page: 1
    };
    GetCategories({ params });
  }

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

  handleChange = (field, value) => {
    const { service, included } = this.state;
    if (value === 'categoryId') {
      if (field.categoryId === service.categoryId) {
        const serviceFields = this.getServiceFields(service, included);
        this.setState({ serviceFields });
      } else {
        this.loadCategory(field.categoryId);
      }
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

  getMainFields = (service) => {
    const {
      name,
      categoryId,
      cost,
      costType,
      isTaxable
    } = service;
    const { categories } = this.props;
    const categoryOptions = categories.map(val => ({
      value: val.id,
      label: startCase(val.name)
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
        md: 4,
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
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        field: 'is_taxable',
        label: 'Taxable',
        type: 'check_box',
        defaultValue: isTaxable,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      }
    ];
  };

  getServiceFields = (service, included) => {
    const orgProperties = get(service, `properties`, {});
    const categories = filter(included, item => item.type === 'categories');
    let serviceFields = [];
    if (!isEmpty(categories)) {
      const category = categories[0];
      const fields = get(category, 'relationships.fields.data', []);
      const includedFields = filter(included, item => item.type === 'service_fields');
      const refinedFields = [];
      for (const index in fields) {
        const field = fields[index];
        const filtered = filter(includedFields, item => !isEmpty(item) && item.id === field.id);
        if (!isEmpty(filtered)) {
          refinedFields.push(filtered[0]);
        }
      }
      serviceFields = refinedFields.map(field => {
        const { name, fieldType, required } = field.attributes;
        const fieldLabel = camelCase(name);
        const defVal = this.getDefaultValue(fieldType, fieldLabel, orgProperties);
        const label = startCase(name);
        return {
          field: fieldLabel,
          label: label,
          type: fieldType,
          required,
          defaultValue: defVal,
          errorMessage: `Enter ${label}`,
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        };
      });
    }
    return serviceFields;
  };

  getServiceFieldsFromCategory = (included) => {
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

  getDescriptionFields = (service) =>{
    const { description } = service;
    return [
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
      }
    ];
  };

  renderFields = () => {
    const { mainFields, serviceFields, descriptionField } = this.state;
    const fields = (
      <React.Fragment>
        { !isEmpty(mainFields) && <FormFields
          ref={this.setMainFieldsRef}
          fields={mainFields}
          onChange={this.handleChange}
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
      </React.Fragment>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );

    return (<EditorSection content={fields} actions={actions} />);
  }

  onSave = () => {
    const { serviceId, serviceFields } = this.state;
    const { UpdateService } = this.props;
    if (this.mainFields.validateFields() &&
      (isEmpty(serviceFields) ||
      (!isEmpty(serviceFields) && this.serviceFields.validateFields()))) {
      let mainValues = {
        ...this.mainFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      if (!isEmpty(serviceFields)) {
        mainValues = {
          ...mainValues,
          properties: this.serviceFields.getFieldValues()
        };
      }

      UpdateService({
        serviceId: serviceId,
        data: mainValues,
        success: () => {
          this.onCancel();
        },
        error: () => {
          const { errors } = this.props;
          if (errors && errors.length > 0) {
            for (const key in errors) {
              if (isNumber(key)) {
                toastr.error(errors[key].join(''));
              }else {
                toastr.error(key, errors[key].join(''));
              }
            }
          }
        }
      });
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { serviceStatus } = this.props;

    return (
      <React.Fragment>
        {serviceStatus === serviceActions.GET_SERVICE ?
          <LoadingSpinner
            loading={true}
          />
        :
          <React.Fragment>
            {this.renderFields()}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  service: state.service.currentService,
  serviceStatus: state.service.currentStatus,
  categories: state.category.categories
});

const mapDispatchToProps = {
  GetCategories,
  GetCategory,
  GetService,
  UpdateService
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
