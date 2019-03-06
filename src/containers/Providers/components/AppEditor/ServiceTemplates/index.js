import React from 'react';

import TemplateSelector from './TemplateSelector';
import PhonePreview from '../../basic/PhonePreview';

import { ContentWrapper, SelectorWrapper, PreviewWrapper } from '../../basic/Wrappers';
import { BoatWash, Fuel, LineHandling, PumpOut, TrashPickup } from './templates';

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