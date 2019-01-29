import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ProviderHeader } from 'components/compound/SectionHeader';
import { ProviderFilter } from 'components/compound/Filters';

import { GetProviders } from 'store/actions/providers';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const PROVIDER_COLUMNS = [
  { label: 'provider name', value: 'name', sort: 'name' },
  { label: 'contact name', value: 'contact_name' },
  { label: 'phone', value: 'phoneNumber', sort: 'phone_number' },
  { label: 'email', value: 'email' },
  { label: 'location', value: 'location' }
];

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: { col: 'name', direction: 'asc' },
      selectedColumns: PROVIDER_COLUMNS
    };
  }

  componentDidMount() {
    this.props.GetProviders({ params: {} });
  }

  onChangeColumns = (columns) => {
    this.setState({
      selectedColumns: columns
    });
  }

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  }

  loadPage = (page) => {
    const { GetProviders } = this.props;
    const { sort } = this.state;
    const params = {
      page: page,
      'provider[sort]': sort.direction,
      'provider[order]': sort.col
    };
    GetProviders({ params });
  };

  toDetails = providerId => {
    this.props.history.push(`/providers/${providerId}/`);
  };

  createNew = () => {
    this.props.history.push('/provider-details/');
  };

  render() {
    const { sort, selectedColumns } = this.state;
    const { providers, page, perPage, total } = this.props;
    const pageCount = Math.ceil(total/perPage);

    return (
      <Wrapper>
        <ProviderHeader
          columns={PROVIDER_COLUMNS}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <ProviderFilter onNewItem={this.createNew} />
        <Table
          columns={selectedColumns}
          records={providers}
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

const mapStateToProps = ({ provider: { providers, page, perPage, total } }) => ({
  providers,
  page,
  perPage,
  total
});

const mapDispatchToProps = {
  GetProviders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Providers)
);
