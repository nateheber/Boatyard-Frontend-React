import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { findIndex } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { createProvider, updateProvider } from 'store/reducers/providers';
import { setErrorState, resetErrorState } from 'store/reducers/appstate';

import { AccountEditor, AccountCreator, HeaderEditor } from '../components';

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
      this.props.updateProvider({
        id,
        data
      });
      this.setState({
        ...data
      });
    } else {
      this.props.createProvider({
        data,
        callback: providerId => {
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
    const { setErrorState, resetErrorState } = this.props;
    return (
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
          <Tab disabled={id === -1}>Header</Tab>
        </TabList>
        <TabPanel>
          {id === -1 ? (
            <AccountCreator
              {...this.state}
              save={this.onSave}
              setErrorState={setErrorState}
              resetErrorState={resetErrorState}
            />
          ) : (
            <AccountEditor
              {...this.state}
              save={this.onSave}
              setErrorState={setErrorState}
              resetErrorState={resetErrorState}
            />
          )}
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
  updateProvider,
  setErrorState,
  resetErrorState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
