import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { findIndex } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { CreateProvider, UpdateProvider } from 'store/actions/providers';

import { AccountCreator } from '../components';
import AccountEditor from '../components/templates/AccountEditor';
import LocationEditor from '../components/templates/LocationEditor';
import AppEditor from '../components/templates/AppEditor';

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
        id: -1,
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
    if (id !== -1) {
      this.props.UpdateProvider({
        providerId: id,
        data
      });
      this.setState({
        ...data
      });
    } else {
      this.props.CreateProvider({
        data,
        success: providerId => {
          this.setState({
            id: providerId,
            ...data
          });
        }
      });
    }
  };

  render() {
    const { id } = this.state;
    return (
      <Tabs>
        <TabList>
          <Tab>ACCOUNT</Tab>
          <Tab disabled={id === -1}>LOCATIONS</Tab>
          <Tab>APP</Tab>
        </TabList>
        <TabPanel>
          {id === -1 ? (
            <AccountCreator
              {...this.state}
              save={this.onSave}
            />
          ) : (
            <AccountEditor
              {...this.state}
              save={this.onSave}
            />
          )}
        </TabPanel>
        <TabPanel>
          <LocationEditor />
        </TabPanel>
        <TabPanel>
          <AppEditor />
        </TabPanel>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ provider: { providers } }) => ({
  providers
});

const mapDispatchToProps = {
  CreateProvider,
  UpdateProvider,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
