import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { SetRefreshFlag } from 'store/actions/auth';
import { LoginWithProvider, DeleteProvider } from 'store/actions/providers';
import { ProviderInfo, ProviderDetailHeader } from '../components';
import LoadingSpinner from 'components/basic/LoadingSpinner';


class ProviderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
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
    const { LoginWithProvider, SetRefreshFlag } = this.props;
    this.setState({ isLoading: true });
    LoginWithProvider({
      providerId: id,
      success: () => {
        // this.props.history.push('/dashboard');
        this.setState({ isLoading: false });
        SetRefreshFlag({flag: true});
      },
      error: (e) => {
        this.setState({ isLoading: false });
        toastr.error('Error', e.message);
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
    const { isLoading } = this.state;
    const provider = this.getProvider();
    const { name } = provider;
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
        {isLoading && <LoadingSpinner loading={isLoading} />}
      </div>
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
  providers
});

const mapDispatchToProps = {
  LoginWithProvider,
  DeleteProvider,
  SetRefreshFlag
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderDetails)
);
