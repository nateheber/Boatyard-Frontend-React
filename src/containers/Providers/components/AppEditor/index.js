import React from 'react';
import styled from 'styled-components';

import {
  AppHeader,
  StepSelector,
  AppBanners,
  AppServiceCategories,
  AppServices,
  ServiceTemplates
} from './components';

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
    services: [],
    currentService: {},
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

  renderSteps = () => {
    const { step, image, services } = this.state;
    switch(step) {
      case 0:
        return <AppBanners image={image} onChangeImage={this.setImage} />
      case 1:
        return <AppServiceCategories image={image} />
      case 2:
        return <AppServices image={image} services={services} onChange={this.setServices} />
      case 3:
      default:
        return <ServiceTemplates />
    }
  }

  render() {
    const { step } = this.state;
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
            { this.renderSteps() }
          </Right>
        </Content>
      </Wrapper>
    )
  }
}