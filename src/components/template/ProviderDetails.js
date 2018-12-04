import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { ProviderDetailsEditor } from './Editors';

class ServiceDetails extends React.Component {
  onCancel = () => {
    this.props.history.goBack();
  };
  onEdit = () => {
    const {
      params: { providerId }
    } = this.props.match;
    this.props.history.push(`/provider-details/${providerId}/`);
  };
  getProvider = () => {
    const {
      params: { providerId }
    } = this.props.match;
    const { providers } = this.props;
    const idx = findIndex(providers, provider => provider.id === providerId);
    return { ...providers[idx] };
  };
  render() {
    const provider = this.getProvider();
    return (
      <ProviderDetailsEditor
        {...provider}
        onCancel={this.onCancel}
        onEdit={this.onEdit}
      />
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
  providers
});

export default withRouter(connect(mapStateToProps)(ServiceDetails));
