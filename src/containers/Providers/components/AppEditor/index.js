import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, set, isEmpty, orderBy } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { GetSiteBanners, CreateSiteBanner } from 'store/actions/site-banners';
import { actionTypes as locationActions, GetProviderLocations, UpdateProviderLocation } from 'store/actions/providerLocations';
import { actionTypes as iconActions, CreateIcon, GetIcons } from 'store/actions/icons';
import { refinedProviderLocationSelector } from 'store/selectors/providerLocation';

import { setServiceTemplateData } from 'utils/serviceTemplate';


import {
  AppHeader,
  StepSelector,
  AppBanners,
  AppServiceCategories,
  AppServices,
  ServiceTemplates,
  Phone,
  CategoryModal
} from './components';
import { ContentWrapper, PreviewWrapper } from '../Wrappers';

const Wrapper = styled.div`
  display: flex;
  font-family: DIN;
  flex-direction: column;
  flex: 1;
  height: calc(100% - 5px);
  margin-top: 20px;
  background-color: white;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background: white;
  height: 100%;
`;

const Left = styled.div`
  width: 306px;
  border-right: 1px solid #E6E6E6;
  height: 100%;
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: scroll;
`

class AppEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      banner: null,
      data: {
        screen: 'Home',
        type: 'homeScreen',
        items: [],
      },
      currentScreen: '',
      currentItem: {},
      visibleOfModal: false,
      selectedLocation: {}
    };
  }

  componentDidMount() {
    const { GetSiteBanners } = this.props;
    GetSiteBanners({ params: { per_page: 1000 }});
    const { selectedLocation } = this.state;
    const { providerLocations } = this.props;
    if (isEmpty(selectedLocation)) {
      if (providerLocations.length > 0) {
        const location = providerLocations[0];
        this.resetData(location);
      }
    }
  }

  refreshData = () => {
    const { providerId, GetProviderLocations } = this.props;
    GetProviderLocations({
      providerId,
      success: () => {
        const { providerLocations } = this.props;
        const { selectedLocation } = this.state;
        const location = providerLocations.find(item => item.id === selectedLocation.id);
        this.resetData(location);
      }
    });
  };

  resetData = (location) => {
    const banner = this.getBanner(location);
    const categories = this.getCategories(location);
    const { data, currentItem } = this.state;
    let updatedItem = {};
    const newData = JSON.parse(JSON.stringify(data));
    const services = this.getServices(location);
    let items = categories.map((category) => {
      let filtered = services.filter(service => (get(service, 'attributes.serviceCategoryId') || '').toString() === get(category, 'id'));
      filtered = orderBy(filtered, ['attributes.position'], ['asc']);
      const subItems = filtered.map((item, index) => {
        const newItem = {
          id: index + 1,
          type: 'service',
          info: item
        };
        if (currentItem.type === 'service') {
          if (get(currentItem, 'info.attributes.name') === get(newItem, 'info.attributes.name')) {
            updatedItem = { ...newItem };
          }
        }
        return newItem;
      });
      if (currentItem.type === 'category') {
        if (get(currentItem, 'info.attributes.name') === get(category, 'info.attributes.name')) {
          updatedItem = { ...category };
        }
      }
      const item = {
        id: category.attributes.position,
        type: 'category',
        info: category,
        items: subItems
      };
      return item;
    });
    const rootServices = services.filter(service => !get(service, 'attributes.serviceCategoryId')).map(service => {
      const item = {
        id: service.attributes.position,
        type: 'service',
        info: service
      };
      if (currentItem.type === 'service') {
        if (get(currentItem, 'info.attributes.name') === get(item, 'info.attributes.name')) {
          updatedItem = { ...item };
        }
      }
      return item;
    });
    items = orderBy(items.concat(rootServices), ['id'], ['asc']);
    items = items.map((item, index) => {
      item.id = index + 1;
      return item;
    })
    set(newData, 'items', items);
    this.setState({
      data: newData,
      selectedLocation: location,
      banner,
      currentItem: updatedItem
    });
  };

  onChangeStep = (step) => {
    this.setState({ step });
  };

  handleChangeBanner = (banner) => {
    this.setState({ banner });
  };

  setServices = (services) => {
    this.setState({ services });
  };

  setCategories = (categories) => {
    this.setState({ categories });
  };

  getEditingPath = () => {
    const { currentScreen } = this.state;
    const parts = currentScreen.split('/');
    if (currentScreen === '') {
      return '';
    }
    const pathParts = parts.map((part) => `items[${part}]`);
    return pathParts.join('.');
  };

  getParentPath = () => {
    const { currentScreen } = this.state;
    const parts = currentScreen.split('/');
    if (parts.length === 1) {
      return '';
    }
    const pathParts = [];
    for(let i = 0; i < parts.length - 1; i += 1) {
      pathParts.push(`items[${parts[i]}]`);
    }
    return pathParts.join('.');
  };

  getParentScreen = () => {
    const { currentScreen } = this.state;
    const parts = currentScreen.split('/');
    const parentParts = [];
    for(let i = 0; i < parts.length - 1; i += 1) {
      parentParts.push(parts[i]);
    }
    return parentParts.join('/');
  };

  getRenderingData = () => {
    const path = this.getEditingPath();
    const { data } = this.state;
    if (path === '') {
      return data;
    }
    return get(data, path);
  };

  getParentData = () => {
    const path = this.getParentPath();
    const { data } = this.state;
    if (path === '') {
      return data;
    }
    return get(data, path);
  };

  getLastId = (list) => {
    let id = -1;
    for (let i = 0; i < list.length; i += 1) {
      if (id <= list[i].id) {
        id = list[i].id
      }
    }
    return id;
  };

  getStep = (type) => {
    switch(type) {
      case 'category':
        return 2;
      case 'service':
        return 3;
      default:
        return 0;
    }
  };

  getSelectedTemplate = () => {
    const { currentItem } = this.state;
    const { data } = this.state;
    const path = this.getParentPath();
    if (path === '') {
      const idx = data.items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      return get(data.items[idx], 'template.templateType', '');
    } else {
      const items = get(data, `${path}.items`, []);
      const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      return get(items[idx], 'template.templateType', '');
    }
  };

  addCategories = (category) => {
    const { currentItem } = this.state;
    if (get(currentItem, 'type') === 'category') {
      toastr.clean()
      toastr.error('Cannot add category under category');
    } else if (get(currentItem, 'type') === 'service') {
      toastr.clean()
      toastr.error('Cannot add category under service');
    } else {
      this.addItem(category, 'category');
    }
  };

  addServices = (service) => {
    const { currentItem } = this.state;
    if (get(currentItem, 'type') === 'service') {
      toastr.clean()
      toastr.error('Cannot add service under service');
    } else {
      this.addItem(service, 'service');
    }
  };

  addItem = (item, type) => {
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    let info = item;
    if (type === 'service') {
      info = {
        attributes: {
          position: 0,
          ...item
        }
      };
    }
    if (path === '') {
      const lastId = this.getLastId(newData.items);
      newData.items.push({
        id: lastId + 1,
        type,
        info: {
          ...info,
          attributes: {
            ...info.attributes,
            position: lastId + 1
          }  
        }
      })
    } else {
      const items = get(newData, `${path}.items`, []);
      const lastId = this.getLastId(items);
      items.push({
        id: lastId + 1,
        type,
        info: {
          ...info,
          attributes: {
            ...info.attributes,
            position: lastId + 1
          }  
        }
      });
      set(newData, `${path}.items`, items);
    }
    this.setState({
      data: newData
    });
  };

  deleteItem = () => {
    const { currentItem } = this.state;
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    if (path === '') {
      const { items } = newData;
      const newItems = items.filter(item => item.type !== currentItem.type || item.id !== currentItem.id);
      newData.items = newItems;
      this.setState({ data: newData, visibleOfModal: false, currentItem: this.getRenderingData() });
    } else {
      let newItems = JSON.parse(JSON.stringify(get(newData, `${path}.items`)));
      newItems = newItems.filter(item => item.type !== currentItem.type || item.id !== currentItem.id);
      set(newData, `${path}.items`, newItems);
      this.setState({ data: newData, visibleOfModal: false, currentItem: this.getRenderingData() });
    }
  };

  handleSave = (baseData, data, iconFile, customIcon = null) => {
    const { CreateIcon, GetIcons } = this.props;
    let type = get(baseData, 'type');
    const currentInfo = get(baseData, 'info', {});
    if (isEmpty(currentInfo)) {
      type = 'category';
    }
    const attributes = get(currentInfo, 'attributes', {});
    const info = {
      ...currentInfo,
      attributes: {
        ...attributes,
        ...data
      }
    };  
    if (type === 'category') {
      if (customIcon && iconFile) {
        CreateIcon({
          data: {
            icon: {
              name: iconFile.name,
              icon: customIcon
            }
          },
          success: (icon) => {
            this.hideModal();
            GetIcons({ params: { per_page: 1000 } });
            if (isEmpty(currentInfo)) {
              this.addCategories({
                ...info,
                attributes: {
                  ...info.attributes,
                  iconId: icon.id
                }
              });
            } else {
              this.updateItem(info);
            }
          },
          error: () => {
            this.hideModal();
          }
        })
      } else {
        if (isEmpty(currentInfo)) {
          this.addCategories(info);
        } else {
          this.updateItem(info);
        }
        this.hideModal();
      }
    } else {
      if (customIcon && iconFile) {
        CreateIcon({
          data: {
            icon: {
              name: iconFile.name,
              icon: customIcon
            }
          },
          success: (icon) => {
            this.hideModal();
            GetIcons({ params: { per_page: 1000 } });
            this.updateItem(info);
          },
          error: () => {
            this.hideModal();
          }
        })
      } else {
        this.updateItem(info);
        this.hideModal();
      }
    }
  };

  updateItem = (info) => {
    const { currentItem } = this.state;
    const updatedItem = JSON.parse(JSON.stringify(currentItem));
    set(updatedItem, 'info', {...currentItem.info, ...info });
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    if (path === '') {
      const idx = newData.items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      newData.items[idx] = updatedItem;
      this.setState({ data: newData, visibleOfModal: false, currentItem: this.getRenderingData() });
    } else {
      const items = get(newData, `${path}.items`);
      const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      items[idx] = updatedItem;
      set(newData, `${path}.items`, items);
      this.setState({ data: newData, visibleOfModal: false, currentItem: this.getRenderingData() });
    }
  };

  setServiceTemplate = (templateInfo) => {
    const { currentItem } = this.state;
    if (get(currentItem, 'type') === 'service') {
      const { data } = this.state;
      const newData = JSON.parse(JSON.stringify(data));
      const path = this.getParentPath();
      if (path === '') {
        const idx = newData.items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
        const serviceInfo = newData.items[idx].info;
        newData.items[idx].template = setServiceTemplateData(serviceInfo, templateInfo);
        this.setState({ data: newData, visibleOfModal: false });
      } else {
        const items = get(newData, `${path}.items`);
        const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
        const serviceInfo = items[idx].info;
        items[idx].template = setServiceTemplateData(serviceInfo, templateInfo);
        set(newData, `${path}.items`, items);
        this.setState({ data: newData, visibleOfModal: false });
      }
    } else {
      toastr.clean()
      toastr.error('Cannot set template to service');
    }
  };

  onChangeTemplate = (templateInfo) => {
    const { data, currentItem } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getParentPath();
    if (path === '') {
      const idx = newData.items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      set(newData.items[idx], 'template.data.data', templateInfo );
    } else {
      const items = get(newData, `${path}.items`);
      const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      set(items[idx], 'template.data.data', templateInfo );
    }
    this.setState({ data: newData });
  };

  onChangeOrder = (items) => {
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    if (path === '') {
      set(newData, 'items', items);
    } else {
      set(newData, `${path}.items`, items);
    }
    this.setState({ data: newData });
  };

  onEdit = (item) => {
    this.setState({ currentItem: item, visibleOfModal: true });
  };

  onClickItem = (item) => {
    const { currentScreen } = this.state;
    const path = this.getEditingPath();
    const { data } = this.state;
    const step = this.getStep(item.type);
    if (path === '') {
      const { items } = data;
      const idx = items.findIndex(i => i.id === item.id && i.type === item.type);
      this.setState({ currentItem: item, currentScreen: `${idx}`, step });
    } else {
      const items = get(data, `${path}.items`, []);
      const idx = items.findIndex(i => i.id === item.id && i.type === item.type);
      this.setState({ currentItem: item, currentScreen: `${currentScreen}/${idx}` }, () => {
        this.setState({ step });
      });
    }
  };

  onBack = () => {
    const data = this.getParentData();
    const parentScreen = this.getParentScreen();
    this.setState({ currentScreen: parentScreen, currentItem: data });
  };

  showModal = () => {
    this.setState({ visibleOfModal: true });
  };

  hideModal = () => {
    const currentItem = this.getRenderingData();
    this.setState({ visibleOfModal: false, currentItem });
  };

  renderSteps = () => {
    const { step, banner, services } = this.state;
    switch(step) {
      case 0:
        return <AppBanners banner={banner} onChangeBanner={this.handleChangeBanner} />
      case 1:
        return (
          <AppServiceCategories
            image={banner}
            onAdd={this.showModal}
            onSelect={this.addCategories}
          />
        );
      case 2:
        return <AppServices image={banner} services={services} onAdd={this.addServices} />
      case 3:
      default:
        return <ServiceTemplates selected={this.getSelectedTemplate()} onChange={this.setServiceTemplate} />
    }
  };

  handleChangeLocation = (locationId) => {
    const { providerLocations } = this.props;
    const selectedLocation = providerLocations.find(locations => locations.id === locationId);
    this.resetData(selectedLocation);
  };

  getBanner = (location) => {
    let banner = null;
    if (location.relationships.hasOwnProperty('site_banners')) {
      banner = get(location, 'relationships.site_banners');
      if (banner.id) {
        banner = {
          id: banner.id,
          ...banner.attributes
        };
      }
    } else {
      if (!(location.banner.url === null || isEmpty(location.banner.url))) {
        banner = { banner: location.banner };
      }
    }
    if (banner === null) {
      banner = { banner: { url: null }};
    }
    return banner;
  }

  getCategories = (location) => {
    return get(location, 'relationships.service_categories', []);
  };

  getServices = (location) => {
    return get(location, 'relationships.provider_location_services', []);
  };

  handleSaveButtonClick = () => {
    const { banner, selectedLocation, data } = this.state;
    const originCategries = get(selectedLocation, 'relationships.service_categories', []);
    const originServices = get(selectedLocation, 'relationships.provider_location_services', []);
    const currentCategories = [];
    const currentCategoryIds = [];
    const currentServices = [];
    const currentServiceIds = [];
    const { items } = data;
    const categoriesPayload = [];
    for(const index in items) {
      const item = items[index];
      const info = get(item, 'info');
      info.attributes.position = parseInt(index) + 1;
      if (item.type === 'category') {
        currentCategories.push(info);
        if(info.hasOwnProperty('id')) {
          currentCategoryIds.push(get(info, 'id'));
        }
        if (item.hasOwnProperty('items')) {
          const subItems = get(item, 'items');
          for(const subIdx in subItems) {
            const subItem = subItems[subIdx];
            const position = parseInt(info.attributes.position) * 100 + parseInt(subIdx) + 1;
            const subInfo = get(subItem, 'info');
            subInfo.attributes['position'] = position;
            currentServices.push(subInfo);
            if(subInfo.hasOwnProperty('id')) {
              currentServiceIds.push(get(subInfo, 'id'));
            }
          }
        }
      } else {
        currentServices.push(info);
        if(info.hasOwnProperty('id')) {
          currentServiceIds.push(get(info, 'id'));
        }
      }
    }
    for (const index in currentCategories) {
      const category = currentCategories[index];
      const attributes = get(category, 'attributes');
      const payload = {
        name: get(attributes, 'name'),
        description: get(attributes, 'description'),
        icon_id: get(attributes, 'iconId'),
        position: get(attributes, 'position')
      };
      if (category.hasOwnProperty('id')) {
        payload['id'] = category.id;
      }
      categoriesPayload.push(payload);
    }

    for(const index in originCategries) {
      const id = get(originCategries[index], 'id');
      if (currentCategoryIds.indexOf(id) === -1) {
        categoriesPayload.push({
          id,
          '_destroy': true
        });
      }
    }

    const { UpdateProviderLocation } = this.props;
    let params = {};
    if (banner.hasOwnProperty('id')) {
      if (banner.id !== get(selectedLocation, 'relationships.site_banners.id')) {
        params = {
          site_banner_id: banner.id
        };
      }
    }
    if (categoriesPayload.length > 0) {
      params = {
        ...params,
        service_categories_attributes: categoriesPayload
      };
      UpdateProviderLocation({
        providerId: selectedLocation.providerId,
        providerLocationId: selectedLocation.id,
        data: {
          provider_location: { ...params }
        },
        success: (location) => {
          const categories = get(location, 'relationships.service_categories', []);
          this.updateLocationServices(categories, originServices, currentServiceIds, currentServices);
        }
      });
    } else {
      this.updateLocationServices(originCategries, originServices, currentServiceIds, currentServices, params);
    }
  };

  updateLocationServices = (categories, originServices, currentServiceIds, services, params = {}) => {
    const { providerId } = this.props;
    const { createServiceClient } = require('../../../../api');
    const serviceClient = createServiceClient('admin');
    const servicesPayload = [];
    for (const index in services) {
      const service = services[index];
      const attributes = get(service, 'attributes');
      const position = get(attributes, 'position');
      const category = categories.find(item => parseInt(item.attributes.position) === Math.floor(position / 100));
      const payload = {
        category_id: get(attributes, 'categoryId'),
        service_id: get(attributes, 'serviceId'),
        name: get(attributes, 'name'),
        description: get(attributes, 'description'),
        icon_id: get(attributes, 'iconId'),
        cost: get(attributes, 'cost') || 0,
        cost_type: get(service, 'costType'),
        service_category_id: get(service, 'serviceCategoryId'),
        position
      };
      if (category) {
        payload['service_category_id'] = get(category, 'id');
      } else {
        payload['service_category_id'] = null;
      }
      if (service.hasOwnProperty('id')) {
        payload['id'] = service.id;
      }
      servicesPayload.push(payload);
    }
    const promises = [];
    for(const index in servicesPayload) {
      const service = servicesPayload[index];
      if (service.service_id) {
        const data = {
          service: {
            provider_id: providerId,
            name: get(service, 'name'),
            description: get(service, 'description'),
            category_id: get(service, 'category_id'),
            icon_id: get(service, 'icon_id'),
            cost: get(service, 'cost'),
            cost_type: get(service, 'cost_type'),
            service_category_id: get(service, 'service_category_id'),
            position: get(service, 'position')
          }
        };
        promises.push(serviceClient.update(service.service_id, data));
      } else {
        const data = {
          service: {
            provider_id: providerId,
            name: get(service, 'name'),
            description: get(service, 'description'),
            category_id: get(service, 'category_id'),
            icon_id: get(service, 'icon_id'),
            cost: get(service, 'cost'),
            cost_type: get(service, 'cost_type'),
            service_category_id: get(service, 'service_category_id'),
            position: get(service, 'position')
          }
        };
        promises.push(serviceClient.create(data));
      }
    }
    if (promises.length > 0) {
      Promise.all(promises).then(results => {
        const payloads = results.map(result => {
          const data = get(result, 'data', {});
          const name = get(data, 'attributes.name');
          const cost = get(data, 'attributes.cost');
          const serviceId = get(data, 'id');
          const locationService = servicesPayload.find(service => service.name === name);
          const payload = {
            name,
            description: get(data, 'attributes.description'),
            provider_id: providerId,
            service_id: serviceId,
            service_category_id: locationService.service_category_id,
            position: locationService.position,
            cost
          };
          if (locationService.hasOwnProperty('id')) {
            payload['id'] = locationService.id;
          }
          return payload;
        });
        for(const index in originServices) {
          const id = get(originServices[index], 'id');
          if (currentServiceIds.indexOf(id) === -1) {
            payloads.push({
              id,
              '_destroy': true
            });
          }
        }
        if (payloads.length > 0) {
          this.updateLocation({
            provider_location: {
              ...params,
              provider_location_services_attributes: payloads
            }
          });
        } else {
          if (!isEmpty(params)) {
            this.updateLocation({ provider_location: { ...params } });
          }
        }
      })
    }
  }

  updateLocation = (data) => {
    const { selectedLocation } = this.state;
    const { UpdateProviderLocation } = this.props;
    UpdateProviderLocation({
      providerId: selectedLocation.providerId,
      providerLocationId: selectedLocation.id,
      data,
      success: () => {
        this.refreshData();
      }
    });
  };

  generatePayloadForServices = (categories, originServices, currentServiceIds, services) => {
    const servicesPayload = [];
    for (const index in services) {
      const service = services[index];
      const attributes = get(service, 'attributes');
      const position = get(attributes, 'position');
      const category = categories.find(item => parseInt(item.attributes.position) === Math.floor(position / 100));
      const payload = {
        category_id: get(attributes, 'categoryId'),
        service_id: get(attributes, 'serviceId'),
        name: get(attributes, 'name'),
        description: get(attributes, 'description'),
        icon_id: get(attributes, 'iconId'),
        cost: get(attributes, 'cost'),
        cost_type: get(service, 'costType'),
        service_category_id: get(service, 'serviceCategoryId'),
        position
      };
      if (category) {
        payload['service_category_id'] = get(category, 'id');
      } else {
        payload['service_category_id'] = null;
      }
      if (service.hasOwnProperty('id')) {
        payload['id'] = service.id;
      }
      servicesPayload.push(payload);
    }

    for(const index in originServices) {
      const id = get(originServices[index], 'id');
      if (currentServiceIds.indexOf(id) === -1) {
        servicesPayload.push({
          id,
          '_destroy': true
        });
      }
    }
    return servicesPayload;
  }

  handlePublishStatus = (published) => {
    this.updateLocation({ provider_location: { published } });
  }

  render() {
    const { step, banner, visibleOfModal, currentItem, currentScreen, selectedLocation } = this.state;
    const renderingData = this.getRenderingData();
    const { providerLocations, iconStatus, locationStatus } = this.props;
    return (
      <Wrapper>
        <AppHeader
          selected={selectedLocation}
          locations={providerLocations}
          onChangeLocation={this.handleChangeLocation}
          onSave={this.handleSaveButtonClick}
          onChangePublishStatus={this.handlePublishStatus}
        />
        <Content>
          <Left>
            <StepSelector
              curStep={step}
              onChange={this.onChangeStep}
            />
          </Left>
          <Right>
            <ContentWrapper>
              { this.renderSteps() }
              <PreviewWrapper>
                <Phone
                  hasBack={currentScreen !== ''}
                  renderingData={renderingData}
                  banner={banner}
                  onEdit={this.onEdit}
                  onChangeOrder={this.onChangeOrder}
                  onChangeTemplateInfo={this.onChangeTemplate}
                  onClickItem={this.onClickItem}
                  onBack={this.onBack}
                />
              </PreviewWrapper>
            </ContentWrapper>
            {visibleOfModal && <CategoryModal
              // title={type === 'category' ? 'Customize Category' : 'Customize Service'}
              baseData={currentItem}
              loading={
                iconStatus === iconActions.CREATE_ICON ||
                locationStatus === locationActions.UPDATE_PROVIDER_LOCATION
              }
              open={visibleOfModal}
              onClose={this.hideModal}
              onSave={this.handleSave}
              onDelete={this.deleteItem}
            />}
          </Right>
        </Content>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider,
  ...refinedProviderLocationSelector(state),
  iconStatus: state.icon.currentStatus,
  locationStatus: state.providerLocation.currentStatus

});

const mapDispatchToProps = {
  GetSiteBanners,
  CreateSiteBanner,
  GetProviderLocations,
  UpdateProviderLocation,
  CreateIcon,
  GetIcons
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);