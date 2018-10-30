import React from 'react';

import MessageBasic from '../MessageBasic';
import TemplateLeft from './TemplateLeft';
import TemplateContent from './TemplateContent';

export class TemplateBox extends React.Component {
  state = {
    selected: ''
  };
  render() {
    const { selected } = this.state;
    return (
      <MessageBasic
        left={
          <TemplateLeft
            onSelect={selected => {
              this.setState({ selected });
            }}
          />
        }
        right={
          <TemplateContent
            selected={selected}
            onCancel={() => {
              this.setState({
                selected: ''
              });
            }}
            onSave={() => {
              this.setState({
                selected: ''
              });
            }}
          />
        }
      />
    );
  }
}
