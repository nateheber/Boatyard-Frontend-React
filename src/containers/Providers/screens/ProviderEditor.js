import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash';

import { CreateProvider, UpdateProvider, GetProvider } from 'store/actions/providers';
import { GetProviderLocations } from 'store/actions/providerLocations';
import { LocationEditor, AccountEditor, AppEditor } from '../components';

import './style.css';

class ProviderEditFlow extends React.Component {
  state = {
    providerId: -1,
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const providerId = get(query, 'provider', -1);
    if (providerId !== -1) {
      const { GetProvider, GetProviderLocations } = this.props;
      GetProvider({ providerId });
      GetProviderLocations({ providerId });
    }
    this.setState({ providerId });
  }

  onCreation = (providerId) => {
    this.setState({ providerId });
    this.props.GetProvider({ providerId });
  }

  onUpdate = () => {
    const { currentProvider } = this.props;
    const providerId = get(currentProvider, 'id');
    this.props.GetProvider({ providerId });
  }

  onSave = data => {
    const { providerId } = this.state;
    if (providerId !== -1) {
      this.props.UpdateProvider({
        providerId,
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
            providerId,
            ...data
          });
        }
      });
    }
  };

  render() {
    const { providerId } = this.state;
    return (
      <Tabs>
        <TabList>
          <Tab>ACCOUNT</Tab>
          <Tab disabled={providerId === -1}>LOCATIONS</Tab>
          <Tab disabled={providerId === -1}>APP</Tab>
        </TabList>
        <TabPanel>
          <AccountEditor
            newFlg={providerId === -1}
            {...this.state}
            onCreation={this.onCreation}
            onUpdate={this.onUpdate}
            save={this.onSave}
          />
        </TabPanel>
        <TabPanel>
          <LocationEditor />
        </TabPanel>
        <TabPanel>
          <AppEditor providerId={providerId} />
        </TabPanel>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ provider: { providers, currentProvider } }) => ({
  currentProvider,
  providers
});

const mapDispatchToProps = {
  CreateProvider,
  UpdateProvider,
  GetProvider,
  GetProviderLocations
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
