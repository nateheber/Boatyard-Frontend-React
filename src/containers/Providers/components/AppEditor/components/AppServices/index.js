import React from 'react';
import { connect } from 'react-redux';
import { get, isEmpty, filter } from 'lodash';

import { ServiceSelector} from './components';

import { ContentWrapper, SelectorWrapper } from '../../../Wrappers';

class AppServices extends React.Component {
  static getDerivedStateFromProps(props) {
    return ({ services: props.services });
  }

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
    this.props.onChange(services);
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
    this.props.onChange(newServices);
  }

  deleteService = (id) => {
    const { services } = this.state;
    const newServices = filter(services, service => service.id !== id);
    this.setState({ services: newServices, showModal: false });
    this.props.onChange(newServices);
  }

  render() {
    const { onAdd } = this.props;
    return (
      <ContentWrapper>
        <SelectorWrapper>
          <ServiceSelector onAdd={onAdd} />
        </SelectorWrapper>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServices);
