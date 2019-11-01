import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { SetRefreshFlag } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import { GetProviderLocations } from 'store/actions/providerLocations';
import { refinedProviderLocationSelector } from 'store/selectors/providerLocation';
import { SearchBox } from 'components/basic/Input';

import { LocationHeader, AddLocationModal, LocationCard } from './components';

const Wrapper = styled.div`
  padding-top: 18px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  padding: 14px 16px;
  border-top: 1px solid #dfdfdf;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 280px;
`;

const LocationHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
`;


class LocationEditor extends React.Component {
  state = {
    showNewLocation: false,
  }

  componentDidMount() {
    const { provider, GetProviderLocations } = this.props;
    const providerId = get(provider, 'id');
    GetProviderLocations({ providerId });
  }

  handleEdit = locationId => () => {
    const { providerLocations } = this.props;
    const idx = providerLocations.findIndex(location => location.id === locationId);
    this.setState({ location: { ...providerLocations[idx] }, showNewLocation: true });
  }

  handleLogin = (location) => {
    const { LoginWithProvider, SetRefreshFlag } = this.props;
    const locationName = get(location, 'relationships.locations.attributes.name');
    LoginWithProvider({
      providerId: location.providerId,
      providerLocationId: location.id,
      locationName,
      success: () => {
        SetRefreshFlag({flag: true});
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  handleCreate = (location) => {
    const { onCreateApp } = this.props;
    if (onCreateApp) {
      onCreateApp(location);
    }
  }

  createNew = () => {
    this.setState({ showNewLocation: true, location: null });
  }

  hideLocationModal = () => {
    this.setState({ showNewLocation: false });
  }

  render() {
    const { showNewLocation, location } = this.state;
    const { provider, providerLocations } = this.props;
    const name = get(provider, 'name');
    const providerId = get(provider, 'id');
    return (
      <Wrapper>
        <LocationHeader onAdd={this.createNew} />
        <EditorWrapper>
          <SearchWrapper>
            <SearchBox />
          </SearchWrapper>
          <LocationHolder>
            {
              providerLocations.map((location, idx) => (
                <LocationCard
                  providerName={name}
                  location={location}
                  onEdit={this.handleEdit(location.id)}
                  onLogin={this.handleLogin}
                  onCreate={this.handleCreate}
                  key={`provider_location_${idx}`}
                />
              ))
            }
          </LocationHolder>
        </EditorWrapper>
        <AddLocationModal providerId={providerId} location={location} open={showNewLocation} onClose={this.hideLocationModal} />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider,
  ...refinedProviderLocationSelector(state)
});

const mapDispatchToProps = {
  GetProviderLocations,
  LoginWithProvider,
  SetRefreshFlag
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationEditor));