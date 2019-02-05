import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import {
  startCase,
  isNumber
} from 'lodash';

import { actionTypes as serviceActions, GetService, UpdateService, CreateService } from 'store/actions/services';
import { GetCategories } from 'store/actions/categories';
import { ServiceEditor } from '../components/ServiceEditor';
import LoadingSpinner from 'components/basic/LoadingSpinner';


class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    this.state = {
      serviceId: query.service,
      name: '',
      categoryId: '',
      cost: '',
      costType: null,
      description: '',
      isTaxable: false
    };
  }

  componentDidMount() {
    this.loadService();
  }

  loadService = () => {
    const { GetService } = this.props;
    const { serviceId } = this.state;
    GetService({ serviceId, success: (service, included) => {
      this.setState({
        ...service
      });
    }});
  };

  loadCategories = () => {
    const { GetCategories } = this.props;
    const params = {
      page: 1
    };
    GetCategories({ params });
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
      this.props.CreateService({
        data: mainValues,
        success: () => {
          this.props.history.push('/services/');
        },
        error: () => {
          const { errors } = this.props;
          for (const key in errors) {
            if (isNumber(key)) {
              toastr.error(errors[key].join(''));
            }else {
              toastr.error(key, errors[key].join(''));
            }
          }
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
    const { serviceStatus } = this.props;
    return (
      <React.Fragment>
        {serviceStatus == serviceActions.GET_SERVICE ?
          <LoadingSpinner
            loading={true}
          />
        :
          <ServiceEditor
            mainFields={mainFields}
            propertyFields={propertyFields}
            onCancel={this.onCancel}
            onSave={this.onSave}
          />
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
  GetService,
  UpdateService,
  CreateService,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
