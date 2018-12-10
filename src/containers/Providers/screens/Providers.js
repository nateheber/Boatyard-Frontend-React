import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { ProviderHeader } from 'components/compound/SectionHeader';
import { ProviderFilter } from 'components/compound/Filters';

import { fetchProviders } from 'reducers/providers';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Providers extends React.Component {
  componentDidMount() {
    this.props.fetchProviders();
  }
  toDetails = providerId => {
    this.props.history.push(`/providers/${providerId}/`);
  };
  createNew = () => {
    this.props.history.push('/provider-details/');
  };
  render() {
    const { providers } = this.props;
    const columns = [
      { label: 'provider name', value: 'name' },
      { label: 'phone', value: 'phoneNumber' }
    ];

    return (
      <Wrapper>
        <ProviderHeader />
        <ProviderFilter onNewItem={this.createNew} />
        <Table
          columns={columns}
          records={providers}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
  providers
});

const mapDispatchToProps = {
  fetchProviders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Providers)
);
