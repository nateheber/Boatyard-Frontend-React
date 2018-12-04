import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { findIndex } from 'lodash';

import { createProvider, updateProvider } from '../../reducers/providers';

import ProfileStep from './EditFlow/Provider/ProfileStep';

class ProviderEditFlow extends React.Component {
  constructor(props) {
    super(props);
    const { providers } = props;
    const query = queryString.parse(props.location.search);
    const providerId = query.category;
    if (providerId) {
      const idx = findIndex(providers, category => category.id === providerId);
      const providerDetail = providers[idx];
      this.state = {
        ...providerDetail
      };
    } else {
      this.state = {
        name: '',
        icon: null,
        logo: null,
        banner: null,
        homeImage: null,
        customImage: null,
        colorBrandingPrimary: '',
        colorBrandingSecondary: '',
        websiteUrl: '',
        timeZone: '',
        phoneNumber: '',
        invoicePrefix: '',
        taxRate: 0,
        subscriptionFee: 0,
        transactionFee: 0
      };
    }
  }

  onSave = data => {
    console.log(data);
  };

  render() {
    return <ProfileStep data={this.state} onSave={this.onSave} />;
  }
}

const mapStateToProps = ({ provider: providers }) => ({
  providers
});

const mapDispatchToProps = {
  createProvider,
  updateProvider
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
