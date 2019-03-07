import React from 'react';
import { connect } from 'react-redux';
import { get, isEmpty, filter } from 'lodash';

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
    return get(currentProvider, 'name', '');
  }

  setServices = (services) => {
    this.setState({ services });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  onEdit = (service) => {
    this.setState({
      currentService: service,
      showModal: true,
    })
  }

  updateService = (values, iconFile, customIcon) => {
    const { services, currentService } = this.state;
    const idx = services.findIndex(service => service.id === currentService.id);
    const newServices = services.map(service => ({...service}));
    newServices[idx] = {
      ...newServices[idx],
      ...values,
      ...(isEmpty(customIcon) ? {} : {customIcon})
    }
    this.setState({ services: newServices, showModal: false });
  }

  deleteService = (id) => {
    const { services } = this.state;
    const newServices = filter(services, service => service.id !== id);
    this.setState({ services: newServices, showModal: false });
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
        <CategoryModal
          title="Customize Service"
          baseData={currentService}
          open={showModal}
          onClose={this.hideModal}
          onSave={this.updateService}
          onDelete={this.deleteService}
        />
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServices);
