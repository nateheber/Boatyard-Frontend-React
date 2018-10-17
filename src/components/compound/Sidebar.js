import React from 'react';
import styled from 'styled-components';

import { SideBarWrapper, SideBarItem } from '../basic/Navigation';

import DashboardActiveIcon from '../../resources/home_active.svg';
import DashboardIcon from '../../resources/home.svg';

import OrdersActiveIcon from '../../resources/shopping_cart_active.svg';
import OrdersIcon from '../../resources/shopping_cart.svg';

import CalendarActiveIcon from '../../resources/calendar_active.svg';
import CalendarIcon from '../../resources/calendar.svg';

import InvoicesActiveIcon from '../../resources/money_bag_active.svg';
import InvoicesIcon from '../../resources/money_bag.svg';

import MessageActiveIcon from '../../resources/read_message_active.svg';
import MessageIcon from '../../resources/read_message.svg';

import AnalyticsActiveIcon from '../../resources/bar_chart_active.svg';
import AnalyticsIcon from '../../resources/bar_chart.svg';

import ServicesActiveIcon from '../../resources/maintenance_active.svg';
import ServicesIcon from '../../resources/maintenance.svg';

import TeamActiveIcon from '../../resources/customer_support_active.svg';
import TeamIcon from '../../resources/customer_support.svg';

import CustomersActiveIcon from '../../resources/conference_call_active.svg';
import CustomersIcon from '../../resources/conference_call.svg';

const navItems = [
  {
    activeImage: DashboardActiveIcon,
    mainImage: DashboardIcon,
    title: 'DASHBOARD'
  },
  {
    activeImage: OrdersActiveIcon,
    mainImage: OrdersIcon,
    title: 'ORDERS'
  },
  {
    activeImage: CalendarActiveIcon,
    mainImage: CalendarIcon,
    title: 'CALENDAR'
  },
  {
    activeImage: InvoicesActiveIcon,
    mainImage: InvoicesIcon,
    title: 'INVOICES'
  },
  {
    activeImage: MessageActiveIcon,
    mainImage: MessageIcon,
    title: 'MESSAGES',
    subItems: [
      {
        title: 'Inbox'
      },
      {
        title: 'Quick Replies'
      },
      {
        title: 'Templates'
      }
    ]
  },
  {
    activeImage: AnalyticsActiveIcon,
    mainImage: AnalyticsIcon,
    title: 'ANALYTICS'
  },
  {
    activeImage: ServicesActiveIcon,
    mainImage: ServicesIcon,
    title: 'SERVICES'
  },
  {
    activeImage: TeamActiveIcon,
    mainImage: TeamIcon,
    title: 'TEAM'
  },
  {
    activeImage: CustomersActiveIcon,
    mainImage: CustomersIcon,
    title: 'CUSTOMERS'
  }
];

const SideBar = () => (
  <SideBarWrapper>
    {navItems.map((item, idx) => (
      <SideBarItem {...item} key={`nav_item_${idx}`} />
    ))}
  </SideBarWrapper>
);

export default SideBar;
