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
    this.props.fetchServices(1);
    this.props.fetchCategories();
  }

  loadPage = (page) => {
    const { fetchServices } = this.props;
    fetchServices(page);
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
      { label: 'location', value: 'location' },
      { label: 'price', value: 'cost', prefix: '$' },
      { label: 'price type', value: 'cost_type' },
      { label: 'price unit', value: 'cost_unit_text' }
    ];
    const { services, loading, page, perPage, total } = this.props;
    const pageCount = Math.ceil(total/perPage);
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          loading={loading}
          columns={columns}
          records={services}
          sortColumn="order"
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services, loading, page, perPage, total } }) => ({
  services,
  loading,
  page,
  perPage,
  total
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
