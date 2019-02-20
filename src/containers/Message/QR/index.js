import React from 'react';
import { findIndex } from 'lodash';

import MessageBasic from '../MessageBasic';
import QRLeft from './QRLeft';
import QRContent from './QRContent';

export class QRBox extends React.Component {
  state = {
    createNew: false,
    empty: true,
    selected: [],
    showItem: -1,
    showContent: false
  };
  render() {
    const items = [
      { id: 1, title: 'test', textBody: 'test test test test' },
      { id: 2, title: 'test1', textBody: 'test test test test' },
      { id: 3, title: 'test2', textBody: 'test test test test' }
    ];
    const { createNew, empty, showItem, showContent } = this.state;
    const idx = findIndex(items, o => o.id === showItem);
    return (
      <MessageBasic
        left={
          <QRLeft
            items={items}
            onAdd={() => {
              this.setState({
                empty: true,
                createNew: true,
                showContent: true
              });
            }}
            onSelect={selected => {
              this.setState({ selected });
            }}
            onShowItem={id => {
              this.setState({
                empty: false,
                showItem: id,
                showContent: true
              });
            }}
            onDeleteItems={() => {}}
          />
        }
        right={
          <QRContent
            createNew={createNew}
            empty={empty}
            onCancel={() => {
              this.setState({
                empty: true,
                showContent: false
              });
            }}
            onSave={() => {
              this.setState({
                empty: true
              });
            }}
            onBack={() => {
              this.setState({
                showContent: false
              });
            }}
            showItem={items[idx]}
          />
        }
        showContent={showContent}
      />
    );
  }
}
