import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ServiceHeader } from 'components/compound/SectionHeader';

import { fetchServices, resetServices } from 'reducers/services';
import { fetchCategories } from 'reducers/categories';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Services extends React.Component {
  componentDidMount() {
    this.props.resetServices();
    this.props.fetchServices();
    this.props.fetchCategories();
  }
  loadMore = () => {
    this.props.fetchServices();
  };
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
    const { services, loading, hasMore } = this.props;
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          loading={loading}
          columns={columns}
          records={services}
          sortColumn="order"
          hasMore={hasMore}
          toDetails={this.toDetails}
          loadMore={this.loadMore}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services, loading, hasMore } }) => ({
  services,
  loading,
  hasMore
});

const mapDispatchToProps = {
  fetchServices,
  resetServices,
  fetchCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
