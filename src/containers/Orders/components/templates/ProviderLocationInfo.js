import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { simpleProviderLocationSelector } from 'store/selectors/providerLocation';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 44px;
  background-color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 15px;
  color: #004258;
`

class ProviderLocationInfo extends React.Component {

  render() {
    const { id, providerLocations } = this.props;
    const location = providerLocations.find(item => `${item.id}` === `${id}`);
    return (
      <div>
        {location && <Wrapper>
          {`${location.provider_name} ${location.name}`}
        </Wrapper>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  providerLocations: simpleProviderLocationSelector(state)
});

export default connect(mapStateToProps, null)(ProviderLocationInfo);