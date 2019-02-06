import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ServiceHeader } from 'components/compound/SectionHeader';

import { actionTypes, GetServices } from 'store/actions/services';

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
  }

  loadPage = (page) => {
    const { GetServices } = this.props;
    const { sort } = this.state;
    const params = {
      page: page,
      'service[sort]': sort.direction,
      'service[order]': sort.col
    };
    GetServices({ params });
  };

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  }

  toDetails = service => {
    this.props.history.push(`/service-details/?service=${service.id}`);
  };

  createService = () => {
    this.props.history.push(`/services/new`);
  };

  render() {
    const columns = [
      { label: 'service name', value: 'name', sort: 'name' },
      { label: 'price', value: 'cost', sort: 'cost', prefix: '$', isValue: true },
      { label: 'price type', value: 'costType', sort: 'cost_type' }
    ];

    const { services, currenStatus, page, perPage, total } = this.props;
    const { sort } = this.state;
    const pageCount = Math.ceil(total/perPage);
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          loading={currenStatus === actionTypes.GET_SERVICES}
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

const mapStateToProps = ({ service: { services, currenStatus, page, perPage, total } }) => ({
  services,
  currenStatus,
  page,
  perPage,
  total
});

const mapDispatchToProps = {
  GetServices
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
