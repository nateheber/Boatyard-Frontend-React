import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { findIndex } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { createProvider, updateProvider } from 'reducers/providers';

import { AccountEditor, HeaderEditor } from '../components';

import './style.css';

class ProviderEditFlow extends React.Component {
  constructor(props) {
    super(props);
    const { providers } = props;
    const query = queryString.parse(props.location.search);
    const providerId = query.provider;
    if (providerId) {
      const idx = findIndex(providers, provider => provider.id === providerId);
      const providerDetail = providers[idx];
      this.state = {
        ...providerDetail,
        step: 0
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
        transactionFee: 0,
        step: 0
      };
    }
  }

  onSave = data => {
    const { id } = this.state;
    this.props.updateProvider({ id, data });
  };

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Header</Tab>
        </TabList>
        <TabPanel>
          <AccountEditor {...this.state} save={this.onSave} />
        </TabPanel>
        <TabPanel>
          <HeaderEditor {...this.state} save={this.onSave} />
        </TabPanel>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
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
