import React from 'react';
import styled from 'styled-components';
import { reduce, findIndex } from 'lodash';
import { withRouter } from 'react-router-dom';

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
    title: 'DASHBOARD',
    link: '/dashboard/'
  },
  {
    activeImage: OrdersActiveIcon,
    mainImage: OrdersIcon,
    title: 'ORDERS',
    link: '/orders/'
  },
  {
    activeImage: CalendarActiveIcon,
    mainImage: CalendarIcon,
    title: 'CALENDAR',
    link: '/calendar/'
  },
  // {
  //   activeImage: InvoicesActiveIcon,
  //   mainImage: InvoicesIcon,
  //   title: 'INVOICES',
  //   link: '/invoices/'
  // },
  {
    activeImage: MessageActiveIcon,
    mainImage: MessageIcon,
    title: 'MESSAGES',
    subItems: [
      {
        title: 'Inbox',
        link: '/inbox/'
      },
      {
        title: 'Quick Replies',
        link: '/quick-replies/'
      },
      {
        title: 'Templates',
        link: '/templates/'
      }
    ]
  },
  {
    activeImage: CustomersActiveIcon,
    mainImage: CustomersIcon,
    title: 'CUSTOMERS',
    link: '/customers/'
  },
  {
    activeImage: AnalyticsActiveIcon,
    mainImage: AnalyticsIcon,
    title: 'ANALYTICS',
    link: '/analytics/'
  },
  {
    activeImage: TeamActiveIcon,
    mainImage: TeamIcon,
    title: 'TEAM',
    link: '/team/'
  },
  {
    activeImage: ServicesActiveIcon,
    mainImage: ServicesIcon,
    title: 'SERVICES',
    link: '/services/'
  }
];

const SideBarContainer = styled.div`
  display: block;
  background-color: #01556d;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 195px !important;
  height: calc(100vh - 68px) !important;
  &::-webkit-scrollbar {
    width: 10px !important;
    margin-left: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 991px) {
    display: block !important;
    width: 110px !important;
    margin-left: -110px;
    &.show {
      margin-left: 0px;
    }
  }
  transition: all 0.3s ease;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
`;

const SideBar = ({ showSidebar, activePage, location }) => {
  const pathname =
    location.pathname === '/' ? '/dashboard/' : location.pathname;
  const activeParent = reduce(
    navItems,
    (result, item) => {
      if (item.link === pathname) {
        return item.title;
      }
      if (item.subItems) {
        const idx = findIndex(item.subItems, item => item.link === pathname);
        if (idx >= 0) return item.title;
      }
      return result;
    },
    ''
  );
  return (
    <SideBarContainer className={showSidebar ? 'show' : 'hide'}>
      <SideBarWrapper>
        {navItems.map((item, idx) => (
          <SideBarItem
            activePage={activePage}
            isActive={item.title === activeParent}
            {...item}
            key={`nav_item_${idx}`}
          />
        ))}
      </SideBarWrapper>
    </SideBarContainer>
  );
};

export default withRouter(SideBar);
