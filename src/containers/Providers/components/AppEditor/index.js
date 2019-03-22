import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, set, isEmpty, sortBy } from 'lodash';
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
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    // const path = this.getEditingPath();
    // if (path === '') {
    //   const items = categories.map((category) => ({
    //     id: category.attributes.position,
    //     type: 'category',
    //     info: category
    //   }));
    //   set(newData, 'items', sortBy(items, ['idx'], ['asc']));
    // } else {
    //   const items = categories.map((category) => ({
    //     id: category.attributes.position,
    //     type: 'category',
    //     info: category
    //   }));
    //   set(newData, `${path}.items`, sortBy(items, ['idx'], ['asc']));
    // }
    const items = categories.map((category) => ({
      id: category.attributes.position,
      type: 'category',
      info: category
    }));
    set(newData, 'items', sortBy(items, ['idx'], ['asc']));
    this.setState({
      data: newData,
      selectedLocation: location,
      banner,
      currentScreen: '',
      currentItem: {}
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

  deleteItem = (baseData) => {
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
      const items = get(newData, `${path}.items`);
      items.filter(item => item.type !== currentItem.type || item.id !== currentItem.id);
      set(newData, `${path}.items`, items);
      this.setState({ data: newData, visibleOfModal: false, currentItem: this.getRenderingData() });
    }
  };

  handleSave = (baseData, data, iconFile, customIcon = null) => {
    const { CreateIcon } = this.props;
    let type = get(baseData, 'type');
    const currentInfo = get(baseData, 'info', {});
    if (isEmpty(currentInfo)) {
      type = 'category';
    }
    const attributes = get(currentInfo, 'attributes', {});
    // const info = {
    //   ...baseData,
    //   info: {
    //     ...currentInfo,
    //     attributes: {
    //       ...attributes,
    //       ...data
    //     }
    //   }
    // };  
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
          }
        })
      } else {
        if (isEmpty(currentInfo)) {
          this.addCategories(info);
        } else {
          this.updateItem(info);
        }
      }
    } else {
      this.updateItem(info);
    }
    this.hideModal();
  };

  saveCategory = (data, iconCreated=false) => {
    this.updateLocation({
      provider_location: {
        service_categories_attributes: [
          { ...data }
        ]
      }
    }, iconCreated);
  }

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

  handleSaveButtonClick = () => {
    const { banner, selectedLocation, data } = this.state;
    const originCategries = get(selectedLocation, 'relationships.service_categories', []);
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
            const subItem = subItems[index];
            const position = parseInt(info.attributes.position) * 100 + subIdx + 1;
            const subInfo = get(subItem, 'info');
            subInfo.attributes.position = position;
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
    console.log('-------------originCategries----------------', originCategries);
    // console.log('-------------currentCategories----------------', currentCategories);
    // console.log('-------------currentCategoryIds----------------', currentCategoryIds);
    // console.log('-------------currentServices----------------', currentServices);
    // console.log('-------------currentServiceIds----------------', currentServiceIds);
    for (const index in currentCategories) {
      const category = currentCategories[index];
      const attributes = get(category, 'attributes');
      const payload = {
        name: get(attributes, 'name'),
        icon_id: get(attributes, 'iconId'),
        position: get(attributes, 'position')
      };
      if (category.hasOwnProperty('id')) {
        payload['id'] = category.id;
      }
      categoriesPayload.push(payload);
    }


    // if (banner.hasOwnProperty('id')) {
    //   if (banner.id !== get(selectedLocation, 'relationships.site_banners.id')) {
    //     this.updateLocation({
    //       provider_location: {
    //         site_banner_id: banner.id
    //       }
    //     });
    //   }
    // }
  };

  updateLocation = (data, iconCreated) => {
    const { selectedLocation } = this.state;
    const { UpdateProviderLocation } = this.props;
    UpdateProviderLocation({
      providerId: selectedLocation.providerId,
      providerLocationId: selectedLocation.id,
      data,
      success: () => {
        this.hideModal();
        this.refreshData();
        if (iconCreated) {
          const { GetIcons } = this.props;
          GetIcons({ params: { per_page: 1000 } });
        }
      }
    });
  };

  handlePublishStatus = () => {
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