import React from 'react';

import { SelectorWrapper } from '../../../Wrappers';
import { BoatWash, Fuel, LineHandling, PumpOut, TrashPickup, TemplateSelector } from './components';

import defaultTemplateInfos from './defaultTemplateValues';

export default class ServiceTemplates extends React.Component {
  static getDerivedStateFromProps(props) {
    return { selected: props.selected };
  }
  state = {
    selected: '',
  }

  onChange = (selected) => {
    this.setState({ selected });
    this.props.onChange({
      templateType: selected,
      data: defaultTemplateInfos[selected],
    })
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
    return (
      <SelectorWrapper>
        <TemplateSelector selected={selected} onChange={this.onChange} />
      </SelectorWrapper>
    )
  }
}