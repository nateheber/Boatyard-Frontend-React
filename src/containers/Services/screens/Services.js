import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ServiceHeader } from 'components/compound/SectionHeader';

import { fetchServices } from 'reducers/services';
import { fetchCategories } from 'reducers/categories';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Services extends React.Component {
  componentDidMount() {
    this.props.fetchServices();
    this.props.fetchCategories();
  }
  toDetails = serviceId => {
    this.props.history.push(`/service-details/?service=${serviceId}`);
  };
  createService = () => {
    this.props.history.push(`/service-details/`);
  };
  render() {
    const columns = [
      { label: 'serivce name', value: 'name' },
      { label: 'label', value: 'label' },
      { label: 'description', value: 'description' }
    ];
    const { services } = this.props;
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          columns={columns}
          records={services}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services } }) => ({
  services
});

const mapDispatchToProps = {
  fetchServices,
  fetchCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
