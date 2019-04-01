import React from 'react';

import { SelectorWrapper } from '../../../Wrappers';
import { TemplateSelector } from './components';
import defaultTemplateInfos from './defaultTemplateValues';

export default class ServiceTemplates extends React.Component {
  static getDerivedStateFromProps(props) {
    return { selected: props.selected };
  }
  state = {
    selected: ''
  };

  onChange = (selected) => {
    this.setState({ selected });
    this.props.onChange({
      templateType: selected,
      data: defaultTemplateInfos[selected]
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <SelectorWrapper>
        <TemplateSelector selected={selected} onChange={this.onChange} />
      </SelectorWrapper>
    )
  }
}