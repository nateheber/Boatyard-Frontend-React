import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { ProviderDetails, ProviderHeader } from '../components';

import { selectProvider, deleteProvider } from 'reducers/providers';

class ServiceDetails extends React.Component {
  onCancel = () => {
    this.props.history.goBack();
  };
  onEdit = () => {
    const {
      params: { providerId }
    } = this.props.match;
    this.props.history.push(`/provider-details?provider=${providerId}`);
  };
  getProvider = () => {
    const {
      params: { providerId }
    } = this.props.match;
    const { providers } = this.props;
    const idx = findIndex(providers, provider => provider.id === providerId);
    return { ...providers[idx] };
  };
  selectProvider = () => {
    const provider = this.getProvider();
    const { id } = provider;
    const { selectProvider } = this.props;
    selectProvider(id);
  };
  deleteProvider = () => {
    const provider = this.getProvider();
    const { id } = provider;
    const { deleteProvider } = this.props;
    deleteProvider(id);
  };
  render() {
    const provider = this.getProvider();
    const { name } = provider;
    return (
      <div>
        <ProviderHeader
          title={name}
          selectProvider={this.selectProvider}
          deleteProvider={this.deleteProvider}
        />
        <ProviderDetails
          {...provider}
          onCancel={this.onCancel}
          onEdit={this.onEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
  providers
});

const mapDispatchToProps = {
  selectProvider,
  deleteProvider
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceDetails)
);
