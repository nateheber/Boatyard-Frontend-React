import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { isEmpty, capitalize } from 'lodash';

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
  { label: 'phone', value: 'phoneNumber', sort: 'phone_number', isPhone: true },
  { label: 'email', value: 'email' },
  { label: 'location', value: 'location' }
];

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: { col: 'name', direction: 'asc' },
      selectedColumns: PROVIDER_COLUMNS,
      providers: []
    };
  }

  componentDidMount() {
    this.loadPage(1);
    // this.props.GetProviders({ params: {} });
    // this.setState({ providers: this.props.providers });
  }

  onChangeColumns = (columns) => {
    this.setState({
      selectedColumns: columns
    });
  }

  onSortChange = (sort) => {
    console.log('sorting');
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  }

  onChangeFilter = (val) => {
    // Search NEEDS to be refactored on the Backend!!!
    // const { providers } = this.state;
    // let search = val.target.value.toLowerCase();
    // let currentList = [];
    // let newList = [];
    // if (search !== "") {
    //   currentList = providers;
    //   newList = currentList.filter(item => {
    //     const lc = item.name.toLowerCase();
    //     const filter = search;
    //     return lc.includes(filter);
    // });
    // } else {
    //   this.props.GetProviders({ params: {} });
    //   newList = this.props.providers;
    // }
    // this.setState({
    //   providers: newList
    // });

    this.setState({
      keyword: val.target.value
    }, () => {
      this.loadPage(1);
    });
  }

  loadPage = (page) => {
    const { GetProviders } = this.props;
    const { sort, keyword } = this.state;
    const params = isEmpty(keyword) ? 
    {} : 
    {
       page: page,
      'search': keyword,
      'provider[name]': capitalize(keyword),
      'provider[sort]': sort.direction,
      // 'provider[order]': sort.col
    };
    GetProviders({ params });
  };

  toDetails = provider => {
    this.props.history.push(`/provider-details?provider=${provider.id}`);
  };

  createNew = () => {
    this.props.history.push('/provider-details/');
  };

  render() {
    const { sort, selectedColumns } = this.state;
    const { providers, page, perPage, total } = this.props;
    console.log(providers);
    const pageCount = Math.ceil(total/perPage);

    return (
      <Wrapper>
        <ProviderHeader
          columns={PROVIDER_COLUMNS}
          selectedColumns={selectedColumns}
          onChangeColumns={this.onChangeColumns} />
        <ProviderFilter onNewItem={this.createNew} onChangeFilter={this.onChangeFilter} />
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
