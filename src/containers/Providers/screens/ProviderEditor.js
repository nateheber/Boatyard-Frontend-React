import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { CreateProvider, UpdateProvider, GetProvider } from 'store/actions/providers';

import { LocationEditor, AccountCreator, AccountEditor, AppEditor } from '../components';

import './style.css';

class ProviderEditFlow extends React.Component {
  state = {
    id: -1,
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const providerId = query.provider;
    this.props.GetProvider({ providerId });
    this.setState({
      id: providerId,
    })
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
  GetProvider,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
