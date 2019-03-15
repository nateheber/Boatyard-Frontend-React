import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, set, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { GetSiteBanners, CreateSiteBanner } from 'store/actions/site-banners';
import { GetProviderLocations, UpdateProviderLocation } from 'store/actions/providerLocations';
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
      showModal: false,
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
        const banner = this.getBanner(location);
        this.setState({
          selectedLocation: location,
          banner
        });
      }
    }
  }

  refreshData = () => {
    const { providerId, GetProviderLocations } = this.props;
    GetProviderLocations({ providerId });
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
    if (path === '') {
      const lastId = this.getLastId(newData.items);
      newData.items.push({
        id: lastId + 1,
        type,
        info: item,
      })
    } else {
      const items = get(newData, `${path}.items`, []);
      const lastId = this.getLastId(items);
      items.push({
        id: lastId + 1,
        type,
        info: item,
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
      this.setState({ data: newData, showModal: false, currentItem: this.getRenderingData() });
    } else {
      const items = get(newData, `${path}.items`);
      items.filter(item => item.type !== currentItem.type || item.id !== currentItem.id);
      set(newData, `${path}.items`, items);
      this.setState({ data: newData, showModal: false, currentItem: this.getRenderingData() });
    }
  };

  updateItem = (info, file, customIcon) => {
    const { currentItem } = this.state;
    const updatedItem = JSON.parse(JSON.stringify(currentItem));
    set(updatedItem, 'info', {...currentItem.info, ...info, ...(isEmpty(customIcon) ? {} : {customIcon})});
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    if (path === '') {
      const idx = newData.items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      newData.items[idx] = updatedItem;
      this.setState({ data: newData, showModal: false, currentItem: this.getRenderingData() });
    } else {
      const items = get(newData, `${path}.items`);
      const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
      items[idx] = updatedItem;
      set(newData, `${path}.items`, items);
      this.setState({ data: newData, showModal: false, currentItem: this.getRenderingData() });
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
        this.setState({ data: newData, showModal: false });
      } else {
        const items = get(newData, `${path}.items`);
        const idx = items.findIndex(item => item.type === currentItem.type && item.id === currentItem.id);
        const serviceInfo = items[idx].info;
        items[idx].template = setServiceTemplateData(serviceInfo, templateInfo);
        set(newData, `${path}.items`, items);
        this.setState({ data: newData, showModal: false });
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
    this.setState({ currentItem: item, showModal: true });
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

  hideModal = () => {
    const currentItem = this.getRenderingData();
    this.setState({ showModal: false, currentItem });
  };

  renderSteps = () => {
    const { step, banner, services, categories } = this.state;
    switch(step) {
      case 0:
        return <AppBanners banner={banner} onChangeBanner={this.handleChangeBanner} />
      case 1:
        return <AppServiceCategories image={banner} categories={categories} onAdd={this.addCategories} />
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
    const banner = this.getBanner(selectedLocation);
    this.setState({ selectedLocation, banner });
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

  handleSaveButtonClick = () => {
    const { banner, selectedLocation } = this.state;
    const { UpdateProviderLocation } = this.props;
    if (banner.hasOwnProperty('id')) {
      if (banner.id !== get(selectedLocation, 'relationships.site_banners.id')) {
        UpdateProviderLocation({
          providerId: selectedLocation.providerId,
          providerLocationId: selectedLocation.id,
          data: {
            provider_location: {
              site_banner_id: banner.id
            }
          },
          success: () => {
            this.refreshData();
          }
        });
      }
    }
  };

  handlePublishStatus = () => {
  }

  render() {
    const { step, banner, showModal, currentItem, currentScreen, selectedLocation } = this.state;
    const renderingData = this.getRenderingData();
    const { info, type } = currentItem;
    const { providerLocations } = this.props;
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
            {
              (type === 'category' || type === 'service') && (
                <CategoryModal
                  title={type === 'category' ? 'Customize Category' : 'Customize Service'}
                  baseData={info}
                  open={showModal}
                  onClose={this.hideModal}
                  onSave={this.updateItem}
                  onDelete={this.deleteItem}
                />
              )
            }
          </Right>
        </Content>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider,
  ...refinedProviderLocationSelector(state)
});

const mapDispatchToProps = {
  GetSiteBanners,
  CreateSiteBanner,
  GetProviderLocations,
  UpdateProviderLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEditor);