import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import PhonePreview from '../basic/PhonePreview';
import PhoneBanner from '../basic/PhoneBanner';
import ServiceSelector from '../compound/ServiceSelector';

import { ContentWrapper, SelectorWrapper, PreviewWrapper } from '../basic/Wrappers';

class AppServices extends React.Component {
  state = {
    services: []
  };

  getProviderName = () => {
    const { currentProvider } = this.props;
    return get(currentProvider, 'data.attributes.name', '');
  }

  setServices = (services) => {
    this.setState({ services });
  }

  render() {
    const { services } = this.services;
    const { image } = this.props;
    const providerName = this.getProviderName();
    return (
      <ContentWrapper>
        <SelectorWrapper>
          <ServiceSelector selected={services} onChange={this.setServices} />
        </SelectorWrapper>
        <PreviewWrapper>
          <PhonePreview>
            <PhoneBanner image={image} providerName={providerName} />
          </PhonePreview>
        </PreviewWrapper>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServices);
