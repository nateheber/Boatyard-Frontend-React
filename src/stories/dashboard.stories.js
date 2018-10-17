import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {
  OrderItem,
  OrderTableHeader,
  OrderTable
} from '../components/basic/Order';

storiesOf('Dashboard', module)
  .add('OrderTableHeader', () => <OrderTableHeader />)
  .add('OrderItem', () => (
    <OrderItem
      title="New Order"
      customer="Brock Prod Test 9 Donnelly"
      orderStatus="Accepted"
      boatMake="Blue"
      boatModel="Berries"
      boatName="Blubes"
    />
  ))
  .add('OrderTable', () => (
    <OrderTable
      items={[
        {
          title: 'New Order',
          customer: 'Brock Prod Test 9 Donnelly',
          orderStatus: 'Accepted',
          boatMake: 'Blue',
          boatModel: 'Berries',
          boatName: 'Blubes'
        },
        {
          title: 'New Order',
          customer: 'Brock Prod Test 8 Donnelly',
          orderStatus: 'Accepted',
          boatMake: 'with',
          boatModel: 'Butter',
          boatName: 'Bagel'
        }
      ]}
    />
  ));
