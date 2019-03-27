import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash';

import { CreateProvider, UpdateProvider, GetProvider } from 'store/actions/providers';
import { GetIcons } from 'store/actions/icons';
import { GetProviderLocations } from 'store/actions/providerLocations';
import { LocationEditor, AccountEditor, AppEditor } from '../components';

import './style.css';

class ProviderEditFlow extends React.Component {
  state = {
    providerId: -1,
    selectedIndex: 0,
    selectedLocation: null
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const providerId = get(query, 'provider', -1);
    if (providerId !== -1) {
      const { GetProvider, GetProviderLocations, GetIcons } = this.props;
      GetProvider({ providerId });
      GetProviderLocations({ providerId });
      GetIcons({ params: { per_page: 1000 } });
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

  onChangeTab = (index) => {
    this.setState({ selectedIndex: index });
  };

  onCreateApp = (selectedLocation) => {
    this.setState({ selectedIndex: 2, selectedLocation });
  };

  render() {
    const { providerId, selectedLocation, selectedIndex } = this.state;
    return (
      <Tabs selectedIndex={selectedIndex} onSelect={this.onChangeTab}>
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
          <LocationEditor onCreateApp={this.onCreateApp} />
        </TabPanel>
        <TabPanel>
          <AppEditor providerId={providerId} selectedLocation={selectedLocation} />
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
  GetProviderLocations,
  GetIcons
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProviderEditFlow)
);
