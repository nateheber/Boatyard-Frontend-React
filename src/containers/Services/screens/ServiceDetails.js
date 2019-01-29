import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import {
  get,
  findIndex,
  startCase
} from 'lodash';

import { ServiceEditor } from '../components/ServiceEditor';

import { UpdateService, CreateService } from 'store/actions/services';

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    const { services, categories } = props;
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
        isTaxable: false
      };
    }
  }

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

  onSave = (mainValues) => {
    if (this.state.id) {
      this.props.UpdateService({
        serviceId: this.state.id,
        data: mainValues,
        success: () => {
          this.props.history.push('/services/');
        }
      });
    } else {
      this.props.CreateService({
        data: mainValues,
        success: () => {
          this.props.history.push('/services/');
        }
      });
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    const mainFields = this.getMainInputOptions();
    const { propertyFields } = this.state;
    return (
      <ServiceEditor
        mainFields={mainFields}
        propertyFields={propertyFields}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({
  service: { services, errors },
  category: { categories }
}) => ({
  services,
  errors,
  categories
});

const mapDispatchToProps = {
  UpdateService,
  CreateService,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
