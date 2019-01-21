import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ServiceHeader } from 'components/compound/SectionHeader';

import { fetchServices, resetServices } from 'store/reducers/services';
import { fetchCategories } from 'store/reducers/categories';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: { col: 'name', direction: 'asc' }
    };
  }

  componentDidMount() {
    this.loadPage(1);
    this.props.fetchCategories();
  }

  loadPage = (page) => {
    const { fetchServices } = this.props;
    const { sort } = this.state;
    const params = {
      page: page,
      'service[sort]': sort.direction,
      'service[order]': sort.col
    };
    fetchServices(params);
  };

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  }

  toDetails = serviceId => {
    this.props.history.push(`/service-details/?service=${serviceId}`);
  };

  createService = () => {
    this.props.history.push(`/service-details/`);
  };

  render() {
    const columns = [
      { label: 'serivce name', value: 'name', sort: 'name' },
      { label: 'price', value: 'cost', sort: 'cost', prefix: '$', isValue: true },
      { label: 'price type', value: 'costType', sort: 'cost_type' }
    ];

    const { services, loading, page, perPage, total } = this.props;
    const { sort } = this.state;
    const pageCount = Math.ceil(total/perPage);
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          loading={loading}
          columns={columns}
          records={services}
          sort={sort}
          onSortChange={this.onSortChange}
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
