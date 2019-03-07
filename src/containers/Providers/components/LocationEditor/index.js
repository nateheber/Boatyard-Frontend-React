import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { GetProviderLocations } from 'store/actions/providerLocations';
import { SearchBox } from 'components/basic/Input';
import { LocationHeader, AddLocationModal, LocationCard } from './components';

import { testData } from './testData';

const Wrapper = styled.div`
  padding-top: 18px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  padding: 24px 26px;
  border-top: 1px solid #dfdfdf;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 22px 0px;
  width: 280px;
`;

const LocationHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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

  onSuccess = (result) => {
    console.log(result);
  }

  showLocationModal = () => {
    this.setState({ showNewLocation: true });
  }

  hideLocationModal = () => {
    this.setState({ showNewLocation: false });
  }

  render() {
    const { showNewLocation } = this.state;
    const { provider } = this.props;
    const name = get(provider, 'name');
    const providerId = get(provider, 'id');
    return (
      <Wrapper>
        <LocationHeader onAdd={this.showLocationModal} />
        <EditorWrapper>
          <SearchWrapper>
            <SearchBox />
          </SearchWrapper>
          <LocationHolder>
            {
              testData.map((location, idx) => (
                <LocationCard providerName={name} locationInfo={location} key={`provider_location_${idx}`} />
              ))
            }
          </LocationHolder>
        </EditorWrapper>
        <AddLocationModal providerId={providerId} open={showNewLocation} onClose={this.hideLocationModal} />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider
});

const mapDispatchToProps = {
  GetProviderLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditor);