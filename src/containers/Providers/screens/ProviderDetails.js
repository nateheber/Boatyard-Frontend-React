import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { actionTypes, LoginWithProvider, DeleteProvider } from 'store/actions/providers';
import { ProviderInfo, ProviderDetailHeader } from '../components';
import LoadingSpinner from 'components/basic/LoadingSpinner';


class ProviderDetails extends React.Component {
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
    const { LoginWithProvider } = this.props;
    LoginWithProvider({
      providerId: id,
      success: () => {
        this.props.history.push('/dashboard');
      }
    });
  };
  deleteProvider = () => {
    const provider = this.getProvider();
    const { id } = provider;
    const { DeleteProvider } = this.props;
    DeleteProvider({ providerId: id });
  };
  render() {
    const provider = this.getProvider();
    const { name } = provider;
    const { currentStatus } = this.props;
    return (
      <div>
        <ProviderDetailHeader
          title={name}
          selectProvider={this.selectProvider}
          deleteProvider={this.deleteProvider}
        />
        <ProviderInfo
          {...provider}
          onCancel={this.onCancel}
          onEdit={this.onEdit}
        />
        {currentStatus === actionTypes.LOGIN_WITH_PROVIDER && <LoadingSpinner loading={true} />}
      </div>
    );
  }
}

const mapStateToProps = ({ provider: { providers, currentStatus } }) => ({
  providers,
  currentStatus
});

const mapDispatchToProps = {
  LoginWithProvider,
  DeleteProvider
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderDetails)
);
