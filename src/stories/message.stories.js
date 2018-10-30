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
import {
  QRItem,
  MessageEmptyState,
  ChatItem
} from '../components/basic/Message';

import { Inbox } from '../components/template/Message/Inbox';
import InboxLeft from '../components/template/Message/Inbox/InboxLeft';
import QRLeft from '../components/template/Message/QR/QRLeft';
import TemplateLeft from '../components/template/Message/Template/TemplateLeft';
import InboxContent from '../components/template/Message/Inbox/InboxContent';

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
  .add('Template Left Part', () => (
    <TemplateLeft
      provider="Boatyard Test"
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
  .add('QR Left Part', () => {
    const items = [
      { id: 1, title: 'test', textBody: 'test test test test' },
      { id: 2, title: 'test1', textBody: 'test test test test' },
      { id: 3, title: 'test2', textBody: 'test test test test' }
    ];
    return (
      <QRLeft
        items={items}
        onAdd={() => {
          action('add QR');
        }}
        onShowItem={id => {
          action(`show item ${id}`);
        }}
        onDeleteItem={id => {
          action(`delete item ${id}`);
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
        id: 2,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 1,
        dateTime: new Date('2018/10/2')
      },
      {
        id: 3,
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
  })
  .add('Inbox Left Part', () => {
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
        id: 2,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 1,
        dateTime: new Date('2018/10/2')
      },
      {
        id: 3,
        subject: 'test',
        sender: 'Test Sender',
        textBody: 'test',
        unread: 0,
        dateTime: new Date('2018/10/21')
      }
    ];
    return (
      <InboxLeft
        items={items}
        onShowItem={id => {
          action(`show item ${id}`);
        }}
        onDeleteItem={id => {
          action(`delete item ${id}`);
        }}
      />
    );
  })
  .add('Message Empty State', () => (
    <MessageEmptyState text="No Message Selected" />
  ))
  .add('Message Chat (own)', () => (
    <ChatItem name="Daniel" time="2018/10/21 23:20:10" body="Test" own />
  ))
  .add('Message Chat (opponent)', () => (
    <ChatItem name="Tester" time="2018/10/21 23:20:10" body="Test" />
  ))
  .add('Message History', () => {
    const data = {
      opponent: 'Brock Prod Test 9',
      opponentType: 'test',
      history: [
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body:
            'test test test test test test test stest teste set set set set',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: false
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body:
            'test test test test test test test stest teste set set set set',
          own: false
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Daniel',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: true
        },
        {
          name: 'Brock Prod Test 9 Donnelly',
          time: '2018/10/21 23:20:10',
          body: 'test',
          own: false
        },
        { name: 'Daniel', time: '2018/10/21 23:20:10', body: 'test', own: true }
      ]
    };
    return <InboxContent data={data} />;
  })
  .add('Inbox Template', () => <Inbox />);
