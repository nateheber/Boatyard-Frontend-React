import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {
  OrderItem,
  OrderTableHeader,
  OrderTable
} from '../components/basic/Order';

import {
  NewOrderSection,
  ScheduledSection,
  AssignedToMeSection
} from '../components/basic/SubSection';

import {
  AssignedOrders,
  NewOrders,
  ScheduledOrders,
  // OverdueInvoices,
  MonthlyRevenue
} from '../components/compound/SubSections';

import Dashboard from '../components/template/Dashboard';

storiesOf('Dashboard', module)
  .add('Main Template', () => <Dashboard />)
  // .add('OrderTableHeader', () => <OrderTableHeader />)
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
  // .add('OrderTable', () => (
  //   <OrderTable
  //     items={[
  //       {
  //         title: 'New Order',
  //         customer: 'Brock Prod Test 9 Donnelly',
  //         orderStatus: 'Accepted',
  //         boatMake: 'Blue',
  //         boatModel: 'Berries',
  //         boatName: 'Blubes'
  //       },
  //       {
  //         title: 'New Order',
  //         customer: 'Brock Prod Test 8 Donnelly',
  //         orderStatus: 'Accepted',
  //         boatMake: 'with',
  //         boatModel: 'Butter',
  //         boatName: 'Bagel'
  //       }
  //     ]}
  //   />
  // ))
  .add('NewOrderSection Header', () => <NewOrderSection count={2} />)
  .add('ScheduledSection Header', () => <ScheduledSection count={2} />)
  .add('AssignedToMeSection Header', () => <AssignedToMeSection count={2} />)
  .add('NewOrder Section', () => <NewOrders />)
  .add('ScheduledOrder Section', () => <ScheduledOrders />)
  .add('AssignedOrder Section', () => <AssignedOrders />)
  // .add('OverdueInvoices Section', () => <OverdueInvoices />)
  .add('MonthlyRevenue Section', () => <MonthlyRevenue />);
