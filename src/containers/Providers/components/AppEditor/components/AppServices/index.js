import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import PhonePreview from '../../../PhonePreview';
import PhoneBanner from '../../../PhoneBanner';
import { ServiceSelector, ServicePreview} from './components';

import { ContentWrapper, SelectorWrapper, PreviewWrapper } from '../../../Wrappers';

import CategoryModal from '../CategoryModal';

class AppServices extends React.Component {
  state = {
    services: [],
    currentService: {},
    showModal: false,
  };

  getProviderName = () => {
    const { currentProvider } = this.props;
    return get(currentProvider, 'data.attributes.name', '');
  }

  setServices = (services) => {
    this.setState({ services });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  onEdit = (service) => {
    console.log(service);
    this.setState({
      currentService: service,
      showModal: true,
    })
  }

  render() {
    const { services, currentService, showModal } = this.state;
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
            <ServicePreview services={services} onEdit={this.onEdit} />
          </PhonePreview>
        </PreviewWrapper>
        <CategoryModal title="Customize Service" category={currentService} open={showModal} onClose={this.hideModal} />
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServices);
