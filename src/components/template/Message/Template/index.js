import React from 'react';

import MessageBasic from '../MessageBasic';
import TemplateLeft from './TemplateLeft';
import TemplateContent from './TemplateContent';

export class TemplateBox extends React.Component {
  state = {
    selected: '',
    showContent: false
  };
  render() {
    const { selected, showContent } = this.state;
    return (
      <MessageBasic
        left={
          <TemplateLeft
            onSelect={selected => {
              this.setState({ selected, showContent: true });
            }}
          />
        }
        right={
          <TemplateContent
            selected={selected}
            onBack={() => {
              this.setState({
                showContent: false
              });
            }}
            onCancel={() => {
              this.setState({
                selected: '',
                showContent: false
              });
            }}
            onSave={() => {
              this.setState({
                selected: '',
                showContent: false
              });
            }}
          />
        }
        showContent={showContent}
      />
    );
  }
}
