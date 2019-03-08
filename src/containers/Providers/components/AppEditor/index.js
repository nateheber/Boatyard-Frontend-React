import React from 'react';
import styled from 'styled-components';
import { get, set } from 'lodash';

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

export default class AppEditor extends React.Component {
  state = {
    step: 0,
    image: null,
    data: {
      screen: 'Home',
      type: 'homeScreen',
      items: [],
    },
    currentScreen: '',
    currentItem: {},
    showModal: false,
  }

  onChangeStep = (step) => {
    this.setState({ step });
  }

  setImage = (image) => {
    this.setState({ image });
  }

  setServices = (services) => {
    this.setState({ services });
  }

  setCategories = (categories) => {
    this.setState({ categories });
  }

  getEditingPath = () => {
    const { currentScreen } = this.state;
    const parts = currentScreen.split('/');
    if (currentScreen === '') {
      return '';
    }
    const pathParts = parts.map((part) => `items[${part}]`);
    return pathParts.join('.');
  }

  getRenderingData = () => {
    const path = this.getEditingPath();
    const { data } = this.state;
    if (path === '') {
      return data;
    }
    return get(data, path);
  }

  getLastId = (list) => {
    let id = -1;
    for (let i = 0; i < list.length; i += 1) {
      if (id <= list[i].id) {
        id = list[i].id
      }
    }
    return id;
  }

  addCategories = (category) => {
    this.addItem(category, 'category');
  }

  addServices = (service) => {
    this.addItem(service, 'service');
  }

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
  }

  onChangeOrder = (items) => {
    const { data } = this.state;
    const newData = JSON.parse(JSON.stringify(data));
    const path = this.getEditingPath();
    if (path === '') {
      set(newData, 'items', items);
    } else {
      set(newData, `${path}.items`, items);
    }
    this.setState({
      data: newData
    })
  }

  onEdit = (item) => {
    this.setState({ currentItem: item, showModal: true });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  renderSteps = () => {
    const { step, image, services, categories } = this.state;
    switch(step) {
      case 0:
        return <AppBanners image={image} onChangeImage={this.setImage} />
      case 1:
        return <AppServiceCategories image={image} categories={categories} onAdd={this.addCategories} />
      case 2:
        return <AppServices image={image} services={services} onAdd={this.addServices} />
      case 3:
      default:
        return <ServiceTemplates />
    }
  }

  render() {
    const { step, image, showModal, currentItem } = this.state;
    const renderingData = this.getRenderingData();
    const { info, type } = currentItem;
    return (
      <Wrapper>
        <AppHeader />
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
                <Phone renderingData={renderingData} image={image} onEdit={this.onEdit} onChangeOrder={this.onChangeOrder} />
              </PreviewWrapper>
            </ContentWrapper>
            <CategoryModal
              title={type === 'category' ? 'Customize Category' : 'Customize Service'}
              baseData={info}
              open={showModal}
              onClose={this.hideModal}
              onSave={this.updateItem}
              onDelete={this.deleteItem}
            />
          </Right>
        </Content>
      </Wrapper>
    )
  }
}