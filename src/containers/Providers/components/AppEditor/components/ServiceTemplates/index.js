import React from 'react';

import PhonePreview from '../../../PhonePreview';

import { ContentWrapper, SelectorWrapper, PreviewWrapper } from '../../../Wrappers';
import { BoatWash, Fuel, LineHandling, PumpOut, TrashPickup, TemplateSelector } from './components';

import defaultTemplateInfos from './defaultTemplateValues';

export default class ServiceTemplates extends React.Component {
  state = {
    selected: 'lineHandling',
  }

  onChange = (selected) => {
    this.setState({ selected });
  }

  renderPreviewer = () => {
    const { selected } = this.state;
    const { data } = defaultTemplateInfos[selected];
    switch (selected) {
      case 'lineHandling':
        return (
          <LineHandling { ...data } />
        );
      case 'trashPickup':
        return (
          <TrashPickup {...data} />
        );
      case 'pumpOut':
        return (
          <PumpOut {...data} />
        );
      case 'fuel':
        return (
          <Fuel {...data} />
        );
      case 'boatWash':
        return (
          <BoatWash {...data} />
        );
      default:
        return false;
    }
  }

  render() {
    const { selected } = this.state;
    const { templateTitle } = defaultTemplateInfos[selected];
    return (
      <ContentWrapper>
        <SelectorWrapper>
          <TemplateSelector selected={selected} onChange={this.onChange} />
        </SelectorWrapper>
        <PreviewWrapper>
          <PhonePreview secondary title={templateTitle}>
            {this.renderPreviewer()}
          </PhonePreview>
        </PreviewWrapper>
      </ContentWrapper>
    )
  }
}