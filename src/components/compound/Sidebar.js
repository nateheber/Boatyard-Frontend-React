import React from 'react';
import { connect } from 'react-redux';
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

// import InvoicesActiveIcon from '../../resources/money_bag_active.svg';
// import InvoicesIcon from '../../resources/money_bag.svg';

import ProviderActiveIcon from '../../resources/provider_icon_active.svg';
import ProviderIcon from '../../resources/provider_icon.svg';

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
    link: '/dashboard/',
    previlages: ['admin', 'provider']
  },
  {
    activeImage: OrdersActiveIcon,
    mainImage: OrdersIcon,
    title: 'ORDERS',
    link: '/orders/',
    previlages: ['admin', 'provider']
  },
  {
    activeImage: CalendarActiveIcon,
    mainImage: CalendarIcon,
    title: 'CALENDAR',
    link: '/calendar/',
    previlages: ['admin', 'provider']
  },
  {
    activeImage: ProviderActiveIcon,
    mainImage: ProviderIcon,
    title: 'PROVIDERS',
    link: '/providers/',
    previlages: ['admin']
  },
  // {
  //   activeImage: InvoicesActiveIcon,
  //   mainImage: InvoicesIcon,
  //   title: 'INVOICES',
  //   link: '/invoices/',
  //   previlages: ['provider']
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
    ],
    previlages: ['admin', 'provider']
  },
  {
    activeImage: AnalyticsActiveIcon,
    mainImage: AnalyticsIcon,
    title: 'ANALYTICS',
    link: '/analytics/',
    previlages: ['admin', 'provider']
  },
  {
    activeImage: ServicesActiveIcon,
    mainImage: ServicesIcon,
    title: 'SERVICES',
    link: '/services/',
    previlages: ['provider']
  },
  {
    activeImage: TeamActiveIcon,
    mainImage: TeamIcon,
    title: 'TEAM',
    link: '/team/',
    previlages: ['admin', 'provider']
  },
  {
    activeImage: CustomersActiveIcon,
    mainImage: CustomersIcon,
    title: 'USERS',
    link: '/users/',
    previlages: ['admin']
  },
  {
    activeImage: CustomersActiveIcon,
    mainImage: CustomersIcon,
    title: 'CUSTOMERS',
    link: '/customers/',
    previlages: ['provider']
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

const SideBar = ({ previlage, showSidebar, activePage, location }) => {
  const pathname =
    location.pathname === '/' ? '/dashboard/' : location.pathname;
  const navigation = navItems ;
  const activeParent = reduce(
    navigation,
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
        {navigation.map((item, idx) => {
          if (item.previlages.lastIndexOf(previlage) > -1) {
            return (
              <SideBarItem
                activePage={activePage}
                isActive={item.title === activeParent}
                {...item}
                key={`nav_item_${idx}`}
              />
            );  
          }
          return null;
        })}
      </SideBarWrapper>
    </SideBarContainer>
  );
};

const mapStateToProps = ({ auth: { previlage } }) => ({
  previlage
});

export default withRouter(connect(mapStateToProps)(SideBar));
