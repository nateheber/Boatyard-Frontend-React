import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Header from '../components/compound/Header';
import {
  DashboardHeader,
  OrderHeader,
  TeamMemberHeader,
  CustomersHeader,
  ServiceHeader
} from '../components/compound/SectionHeader';

storiesOf('Header', module)
  .add('Header', () => <Header />)
  .add('Dashboard Header', () => <DashboardHeader />)
  .add('Order Header', () => <OrderHeader />)
  .add('Team Header', () => <TeamMemberHeader />)
  .add('Service Header', () => <ServiceHeader />)
  .add('Customers Header', () => <CustomersHeader />);
