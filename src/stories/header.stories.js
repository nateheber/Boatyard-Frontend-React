import React from 'react';

import { storiesOf } from '@storybook/react';

import Header from '../components/compound/Header';
import {
  DashboardHeader,
  OrderHeader,
  CustomersHeader,
  ServiceHeader
} from '../components/compound/SectionHeader';

storiesOf('Header', module)
  .add('Header', () => <Header />)
  .add('Dashboard Header', () => <DashboardHeader />)
  .add('Order Header', () => <OrderHeader />)
  .add('Service Header', () => <ServiceHeader />)
  .add('Customers Header', () => <CustomersHeader />);
