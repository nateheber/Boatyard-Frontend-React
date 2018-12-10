import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { ServiceEditor } from './Editors';

import { updateServices, createServices } from 'reducers/services';

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    const { services } = props;
    const query = queryString.parse(props.location.search);
    const serviceId = query.service;
    if (serviceId) {
      const idx = findIndex(services, service => service.id === serviceId);
      const serviceDetail = services[idx];
      this.state = {
        ...serviceDetail
      };
    } else {
      this.state = {
        name: '',
        subtitle: '',
        description: '',
        secondaryDescription: '',
        categoryId: -1,
        label: '',
        additionalDetails: '',
        serviceDetails: ''
      };
    }
  }
  onSave = data => {
    if (this.state.id) {
      this.props.updateServices({
        id: this.state.id,
        data
      });
      this.props.history.goBack();
    } else {
      this.props.createServices(data);
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    const { categories } = this.props;
    const categoryOptions = categories.map(val => ({
      id: val.id,
      name: val.name
    }));
    return (
      <ServiceEditor
        data={this.state}
        categoryOptions={categoryOptions}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({
  service: { services },
  category: { categories }
}) => ({
  services,
  categories
});

const mapDispatchToProps = {
  updateServices,
  createServices
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
