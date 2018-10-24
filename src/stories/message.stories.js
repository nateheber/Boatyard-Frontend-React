import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {
  InboxHeader,
  QRHeader,
  TemplatesHeader
} from '../components/compound/MessageHeader';

import {
  TemplateSelector,
  QRSelector,
  InboxSelector
} from '../components/compound/MessageComponents';
import { QRItem } from '../components/basic/Message';

storiesOf('Message', module)
  .add('Inbox Header with items', () => (
    <InboxHeader
      selected={0}
      total={2}
      onCompose={() => {
        action('compose');
      }}
    />
  ))
  .add('Inbox Header with selected items', () => (
    <InboxHeader
      selected={2}
      total={2}
      onCompose={() => {
        action('compose');
      }}
    />
  ))
  .add('Quick Replies Header', () => (
    <QRHeader
      onAdd={() => {
        action('add');
      }}
    />
  ))
  .add('Templates Header', () => <TemplatesHeader />)
  .add('Template Selector', () => (
    <TemplateSelector
      provider="Brock's Boat Detailing"
      onSelect={type => {
        action(type);
      }}
    />
  ))
  .add('Quick Replies Item', () => (
    <QRItem
      title="test"
      textBody="testtest test"
      selected
      onCheck={() => {
        action('check QR item');
      }}
      onSelect={() => {
        action('select QR item');
      }}
    />
  ))
  .add('QR Selector', () => {
    const items = [
      { id: 1, title: 'test', textBody: 'test test test test' },
      { id: 2, title: 'test1', textBody: 'test test test test' },
      { id: 3, title: 'test2', textBody: 'test test test test' }
    ];
    return (
      <QRSelector
        items={items}
        onChangeSelection={selection => {
          console.log(selection);
        }}
        onSelect={id => {
          action(`selected QR_${id}`);
        }}
        onDelete={id => {
          action(`deleting QR_${id}`);
        }}
      />
    );
  })
  .add('Inbox Selector', () => {
    const items = [
      {
        id: 1,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 0,
        dateTime: new Date('2018/10/1')
      },
      {
        id: 1,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 1,
        dateTime: new Date('2018/10/2')
      },
      {
        id: 1,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 0,
        dateTime: new Date('2018/10/21')
      }
    ];
    return (
      <InboxSelector
        items={items}
        onChangeSelection={selection => {
          console.log(selection);
        }}
        onSelect={id => {
          action(`selected QR_${id}`);
        }}
        onDelete={id => {
          action(`deleting QR_${id}`);
        }}
      />
    );
  });
